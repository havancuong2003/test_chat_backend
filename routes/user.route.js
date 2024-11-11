import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/", protectRoute, getUserForSidebar);

export default route;
