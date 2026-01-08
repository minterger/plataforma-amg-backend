import { Router } from "express";
import { register, login, getUser } from "../controllers/user.controller.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const route = Router();

route.post("/user/signin", login);
route.post("/user/signup", register);
route.get("/user", decodeToken, getUser);

export default route;
