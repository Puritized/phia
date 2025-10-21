import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Initialize
dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
import userRoutes from "./routes/userRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/payments", paymentRoutes);

// For production frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));