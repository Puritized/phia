import Result from "../models/resultModel.js";

export const addResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.id }).populate("studentId");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};