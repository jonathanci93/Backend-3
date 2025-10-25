
import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specie: { type: String, enum: ["dog", "cat", "bird", "other"], default: "dog" },
  birthDate: { type: Date },
  adopted: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Pet", petSchema);
