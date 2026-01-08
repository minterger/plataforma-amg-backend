import {
  getVehiculos,
  createVehiculo,
  getVehiculo,
} from "../controllers/vehiculo.controller.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";
import { Router } from "express";

const router = Router();

router.get("/vehiculos", decodeToken, getVehiculos);
router.post("/vehiculos", decodeToken, createVehiculo);
router.get("/vehiculos/:id", decodeToken, getVehiculo);

export default router;
