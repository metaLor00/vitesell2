import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import config from "config";

const { Schema, model } = mongoose;

export const  userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true  
    },
    password:{
        type:String,
        minlength:8,
        maxlength:1024,
        required:true
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "mentor", "manager"],
      default: ["user"]
    } 
});
///information expert principle
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id,roles:this.roles }, config.get("jwtPrivateKey"));
};
const User=model('User',userSchema);

 const userValidationSchemas={
  body:Joi.object({
    name:Joi.string().min(3).required().messages({
      'string.base':'Name must be a string',
      'string.empty':'Name cannot be empty',
      'string.min':'Name must be at least 3 characters long',
      'any.required':'Name is required'
    }),
    email:Joi.string().email().required().messages({
      'string.base':'Email must be a string',
      'string.empty':'Email cannot be empty',
      'string.email':'Email must be a valid email',
      'any.required':'Email is required'
    }),
    password:Joi.string().min(8).max(255).required().messages({
      'string.base':'Password must be a string',
      'string.empty':'Password cannot be empty',
      'string.min':'Password must be at least 8 characters long',
      'any.required':'Password is required'
    })
  })
};

export {User,userValidationSchemas};