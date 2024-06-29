import express from "express";
import { deletebooking, getbookingbyid, newbooking } from "../controllers/booking-controller.js";
const bookingRouter = express.Router();
bookingRouter.post("/", newbooking);
bookingRouter.get("/:id", getbookingbyid);
bookingRouter.delete("/:id",deletebooking );
export default bookingRouter;