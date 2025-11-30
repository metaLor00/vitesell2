import express from 'express';
import {Movie,movieValidationSchemas} from '../models/movie.js';
import mongoose from 'mongoose';
import validate from '../utils/validate.js';
import { Genre } from '../models/genre.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import asyncMiddleware from '../middlewares/async-middleware.js';

const movieRouter=express.Router();

movieRouter.get('/',asyncMiddleware(async(req,res)=>{
  const movies=await Movie.find().sort('-createdAt');
  res.status(200).json(movies);
} ));
movieRouter.get('/:id',validate(movieValidationSchemas),(req,res)=>{
       const id=req.params.id;
       if (mongoose.Types.ObjectId.isValid(id)) {
        Movie.findById(id).then((movie)=>{
           res.status(200).json(movie);
       }).catch((err)=>{
           res.status(500).json({message:err.message});
            console.log(err.message);
       });  
    } else {
        res.status(400).json({message: 'Invalid ID format'});
    }
})
movieRouter.post('/',authMiddleware,validate(movieValidationSchemas),async(req,res)=>{
 // Access the validated body here
const validatedBody = req.validatedBody;
const genre=await Genre.findById(validatedBody.genreId);
if(!genre){
 return  res.status(400).json({message: 'Invalid genre ID'});
}
let movie=new Movie({...validatedBody,genre:{_id:genre._id,name:genre.name}});
 movie = await movie.save();
 res.status(201).json(movie);
})  
export default movieRouter;