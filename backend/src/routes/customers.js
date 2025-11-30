import express from 'express';
import { Customer, customerValidationSchemas } from '../models/customer.js';
import validate from '../utils/validate.js';
import mongoose from 'mongoose';

const customerRouter=express.Router();

customerRouter.get('/',async(req,res)=>{
    const customers=await Customer.find();
    res.status(200).json(customers);
});

customerRouter.get('/:id',async(req,res)=>{
    const id=req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        const customer=await Customer.findById(id);
        if(!customer){
            return res.status(404).json({message:'Customer not found'});
        }
        res.status(200).json(customer);
    } else {
        res.status(400).json({message:'Invalid ID format'});
    }
});

customerRouter.post('/',validate(customerValidationSchemas),async(req,res)=>{ 

  const validatedBody=req.validatedBody;

  let customer=new Customer({...validatedBody});

  customer=await customer.save();

  res.status(201).json(customer);

});

export default customerRouter;