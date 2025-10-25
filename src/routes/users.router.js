import { Router } from "express";
import User from "../models/User.js";

const router = Router();

//* GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const docs = await User.find().limit(200).lean();
    res.json({ status: "success", payload: docs });
  } catch (error) { next(error); }
});

//* POST /api/users
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body; 
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ status: "success", payload: user });
  } catch (err) { next(err); }
});

export default router;

