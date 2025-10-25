import { Router } from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

//* Route asign pet

router.post("/:uid/:pid", async (req, res, next) => {
    try {
        const { uid, pid } = req.params;
        const user = await User.findById(uid);
        const pet = await Pet.findById(pid);
        if (!user || !pet) return res.status(404).json({ status: "error", message: "User or Pet not found" });
        if (pet.adopted) return res.status(409).json({ status: "error", message: "Pet already adopted" });

        pet.adopted = true;
        pet.owner = user._id;
        await pet.save();

        user.pets.push(pet._id);
        await user.save();

        res.status(201).json({ status: "success", payload: { user: user._id, pet: pet._id } });
    } catch (err) { next(err); }
});

//* Route get adopted pets

router.get("/", async (req, res, next) => {
    try {
        const adopted = await Pet.find({ adopted: true }).populate("owner", "firstName lastName email").lean();
        res.json({ status: "success", payload: adopted });
    } catch (err) { next(err); }
});

//* Route delete pet 
router.delete("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const pet = await Pet.findById(pid);
        if (!pet) return res.status(404).json({ status: "error", message: "Pet not found" });
        if (!pet.adopted) return res.status(409).json({ status: "error", message: "Pet is not adopted" });

        const user = await User.findById(pet.owner);
        pet.adopted = false;
        pet.owner = null;
        await pet.save();

        if (user) {
            user.pets = user.pets.filter(p => String(p) !== String(pet._id));
            await user.save();
        }

        res.json({ status: "success", payload: { pet: pet._id } });
    } catch (err) { next(err); }
});

export default router;
