export const logging=(req,res,next)=>{
    console.log("logging-----");
    next();
}

export const logenv=(req,res,next)=>{
   const env=process.env.NODE_ENV;
    console.log("environment is "+env);
    next();
}