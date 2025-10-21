import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  reference: { type: String, required: true, unique: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);