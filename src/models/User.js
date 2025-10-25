
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pets" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
