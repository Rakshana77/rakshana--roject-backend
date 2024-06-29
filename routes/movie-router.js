import express from "express";
import { addmovie, getallmovies, getmoviesbyid } from "../controllers/movie-controller.js";
const movieRouter = express.Router();
movieRouter.get("/", getallmovies)
movieRouter.get("/:id", getmoviesbyid);
movieRouter.post("/", addmovie);
export default movieRouter;