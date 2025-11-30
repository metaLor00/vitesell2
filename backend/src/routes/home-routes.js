import express from "express";
import { home } from "../controllers/homeController.js";

const homeRouter = express.Router();

homeRouter.get("/", home);

export default homeRouter;