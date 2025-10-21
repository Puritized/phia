import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  term: { type: String, required: true },
  session: { type: String, required: true },
  subjects: [
    {
      name: String,
      ca: Number,
      exam: Number,
      total: Number,
      grade: String,
    },
  ],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);