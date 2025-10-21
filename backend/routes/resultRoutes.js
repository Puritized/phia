import express from "express";
import { addResult, getStudentResults } from "../controllers/resultController.js";

const router = express.Router();
router.post("/", addResult);
router.get("/:id", getStudentResults);

export default router;