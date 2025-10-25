
import mongoose from "mongoose";
export const initMongo = async (uri) => {
  await mongoose.connect(uri);
  console.log("Mongo conectado");
};
