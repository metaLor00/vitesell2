import Joi from "joi";
import mongoose from "mongoose";


const { Schema, model } = mongoose;

const customerSchema=new Schema({
  name:{
      type:String,
      required:[true,'Name is required'],
      minlength:[3,'Name must be at least 3 characters long']
  },
  isGold:{
    type:Boolean,
    default:false     
  },
  phone:{
   type :String,
   required:[true,'Phone is required'],
   minlength:[10,'Phone must be at least 10 characters long'],
   maxlength:[15,'Phone must be at most 15 characters long'],
   match:[/^[0-9]{10}$/,'Phone must be 10 digits']
  }
  
})

 const Customer=model('Customer',customerSchema)

 const customerValidationSchemas={
  body:Joi.object({
    name:Joi.string().min(3).required().messages({
      'string.base':'Name must be a string',
      'string.empty':'Name cannot be empty',
      'string.min':'Name must be at least 3 characters long',
      'any.required':'Name is required'
    }),
    isGold:Joi.boolean(),
    phone:Joi.string().min(10).max(15).required().pattern(/^[0-9]{10}$/).messages({
      'string.base':'Phone must be a string',
      'string.empty':'Phone cannot be empty',
      'string.min':'Phone must be at least 10 characters long',
      'string.max':'Phone must be at most 15 characters long',
      'any.required':'Phone is required'
    })
  })
}

export {Customer,customerValidationSchemas};