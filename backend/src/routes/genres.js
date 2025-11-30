import express from "express";
import { Genre, genreValidationSchemas } from "../models/genre.js";
import mongoose from "mongoose";
import validate from "../utils/validate.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import authorize from "../middlewares/authorize.js";
import asyncMiddleware from "../middlewares/async-middleware.js";
const genreRouter = express.Router();


genreRouter.get("/",asyncMiddleware(async(req, res) => {
  const genres=await Genre.find().sort('name');
  res.status(200).json(genres);
}));
genreRouter.get("/:id", validate(genreValidationSchemas),asyncMiddleware(async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).json({ message: "Genre not found" });
  }
  res.status(200).json(genre);
}));
genreRouter.post(
  "/",
  authMiddleware,
  validate(genreValidationSchemas),
  async (req, res) => {
    // Access the validated body here
    const validatedBody = req.validatedBody;
    let genre = new Genre(validatedBody);
    genre = await genre.save();
    res.status(201).json(genre);
  }
);
genreRouter.delete("/:id",authMiddleware,authorize(['admin']),async(req,res)=>{
  const id=req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const genre=await Genre.findByIdAndDelete(id);
    if(!genre){
      return res.status(404).json({message:'Genre not found'});
    }
    res.status(200).json(genre);
  } else {
    res.status(400).json({message:'Invalid ID format'});    
  }
})
export default genreRouter;
