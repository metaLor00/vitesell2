import { User } from "../../../src/models/user";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe('user.generateAuthToken',()=>{
    it('should create a valid token',()=>{
        const payload={
            _id:new mongoose.Types.ObjectId().toHexString(),
            roles:["user"]}
        const user =new User(payload)
        const token = user.generateAuthToken();
        const decoded=jwt.verify(token,config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject({ _id: payload._id, roles: payload.roles });
    })
})