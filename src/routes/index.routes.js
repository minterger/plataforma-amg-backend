import { Router } from "express";
import {
  getContratoFlete,
  getContratoFleteIndex,
} from "../controllers/index.controller.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const route = Router();

// route.get("/viaje/:contrato", decodeToken, getContratoFlete);
route.get("/viaje/:contrato", getContratoFlete);
route.get("/viaje", getContratoFlete);

route.post("/viaje", getContratoFleteIndex);

export default route;
