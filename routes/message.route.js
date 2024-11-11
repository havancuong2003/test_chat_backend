import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const route = express.Router();

route.post("/send/:id", protectRoute, sendMessage);
route.post("/:id", protectRoute, getMessage);
export default route;
