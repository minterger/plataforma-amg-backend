import { Router } from "express";
import {
  createChofer,
  updateChofer,
} from "../controllers/chofer.controller.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const router = Router();

router.post("/chofer", decodeToken, createChofer);
router.put("/chofer/:id", decodeToken, updateChofer);

export default router;
