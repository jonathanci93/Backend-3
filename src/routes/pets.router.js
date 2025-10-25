import { Router } from "express";
import Pet from "../models/Pet.js";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.find().lean();
    res.json({ status: "success", payload: pets });
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const pet = await Pet.create({ name });
    res.status(201).json({ status: "success", payload: pet });
  } catch (err) { next(err); }
});

export default router;
