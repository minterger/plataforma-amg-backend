import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import indexRouter from "./routes/index.routes.js";
import empresaRouter from "./routes/empresa.routes.js";
import userRouter from "./routes/user.routes.js";
import viajesRouter from "./routes/viajes.routes.js";

import "./database.js";

// variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// init express
const app = express();

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(morgan("dev"));
app.use(cors());

// routes
app.use(indexRouter);
app.use(empresaRouter);
app.use(userRouter);
app.use(viajesRouter);

// path publico
app.use(express.static(path.join(__dirname, "public")));

export default app;
