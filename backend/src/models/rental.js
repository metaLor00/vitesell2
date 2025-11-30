import Joi from "joi";
import mongoose from "mongoose";
const {Schema,model}=mongoose;
// Joi validation schema for requests
export const rentalValidationSchemas = {
  body: Joi.object({
    title: Joi.string(), 
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    rentalDate: Joi.date().required(),
    returnDate: Joi.date()
  }),
};

const rentalSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    customer:{
        type:new Schema({
            name:{
                type:String,
                required:true
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true
            }
        })
    },
    movie:{
      type:new Schema({
        title:{
          type:String,
          required:true
        },
        genre:{
          type:String,
          required:true
        },
        numberInStock:{
          type:Number,
          required:true
        },
        dailyRentalRate:{
          type:Number,
          required:true          
       }
      })
    },
    rentalDate:{
        type:Date,
        required:true
    },
    returnDate:{
        type:Date,
    }
})
export const Rental=model('Rental',rentalSchema);