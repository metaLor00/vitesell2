import Joi from "joi";
import mongoose from "mongoose";
import { genreSchema } from "./genre.js";
const { Schema, model } = mongoose;

// Movie Mongoose schema
const movieSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [255, "Title must be less than 255 characters long"],
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

// Movie model
const Movie = model("Movie", movieSchema);

// Joi validation schema for requests
const movieValidationSchemas = {
  body: Joi.object({
    title: Joi.string(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  }),
};

export { Movie, movieValidationSchemas };
