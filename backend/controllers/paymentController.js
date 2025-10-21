import axios from "axios";
import Payment from "../models/paymentModel.js";

export const initializePayment = async (req, res) => {
  try {
    const { email, amount, userId } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    await Payment.create({
      userId,
      amount,
      reference: response.data.data.reference,
      status: "pending",
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const status = response.data.data.status === "success" ? "success" : "failed";
    await Payment.findOneAndUpdate({ reference }, { status });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};