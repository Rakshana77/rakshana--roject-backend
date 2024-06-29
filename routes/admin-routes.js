import express from "express";
import { addAdmin, adminlogin, getadmin } from "../controllers/admin-controller.js";
const adminRouter = express.Router();
adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminlogin);
adminRouter.get("/", getadmin);
export default adminRouter;