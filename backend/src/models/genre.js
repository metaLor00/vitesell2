import Joi from 'joi';
import mongoose from 'mongoose';
import joiObjectId from 'joi-objectid';
Joi.objectId = joiObjectId(Joi);
const { Schema, model } = mongoose;

// Genre Mongoose schema
export const genreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
  }
});

// Genre model
const Genre = model('Genre', genreSchema);

// Joi validation schema for requests
const genreValidationSchemas = {
  body: Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required',
    }),
  }),
  // Uncomment and use these if needed
  // query: Joi.object({
  //   ref: Joi.string().optional(),
  // }),
  params: Joi.object({
        id: Joi.objectId().required().messages({
      'string.pattern.name': 'Invalid ID', // joi-objectid uses pattern internally
      'any.required': 'ID is required',
    }),
  }),
};

export { Genre, genreValidationSchemas };
