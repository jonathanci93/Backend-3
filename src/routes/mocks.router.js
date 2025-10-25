
import { Router } from "express";
import { makeManyUsers, makeManyPets } from "../utils/mocking.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

//! GET /api/mocks/mockingpets
router.get("/mockingpets", async (req, res, next) => {
  try {
    const quantity = Number(req.query.quantity || 50);
    const pets = makeManyPets(quantity);
    res.json({ status: "success", payload: pets });
  } catch (error) { next(error); }
});

//! GET /api/mocks/mockingusers
router.get("/mockingusers", async (req, res, next) => {
  try {
    const quantity = Number(req.query.quantity || 50);
    const users = await makeManyUsers(quantity);
    res.json({ status: "success", payload: users });
  } catch (error) { next(error); }
});

//! POST /api/mocks/generateData
//! body: { users: number, pets: number }
router.post("/generateData", async (req, res, next) => {
  try {
    const usersquantity = Number(req.body.users || 0);
    const petsquantity = Number(req.body.pets || 0);

    let createdUsers = [], createdPets = [];
    if (usersquantity > 0) {
      const users = await makeManyUsers(usersquantity);
      createdUsers = await User.insertMany(users, { ordered: false });
    }
    if (petsquantity > 0) {
      const pets = makeManyPets(petsquantity);
      createdPets = await Pet.insertMany(pets, { ordered: false });
    }

    res.status(201).json({ status: "success", payload: { users: createdUsers.length, pets: createdPets.length } });
  } catch (error) { next(error); }
});

export default router;
