
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { initMongo } from "./config/db.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import { errorHandler } from "./middlewares/error-handler.js";

//* importar swagger y adoption 

import adoptionRouter from "./routes/adoption.router.js";
import { swaggerServe, swaggerSetup } from "./docs/swagger.js";

const app = express();

//* CORS
app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET || "secret"));
app.use(morgan("dev"));

//* Routes
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoption", adoptionRouter);

//* Swagger
app.use("/docs", swaggerServe, swaggerSetup);

//* Error handler
app.use(errorHandler);

//* Init DB + listen
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  initMongo(process.env.MONGO_URI || "mongodb://localhost:27017/entrega_mocks")
    .then(() => app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`)))
    .catch(console.error);
}

export default app; 

