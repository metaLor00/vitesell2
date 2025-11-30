import express from "express";
import genreRouter from "../routes/genres.js";
import movieRouter from "../routes/movies.js";
import rentalRouter from "../routes/rentals.js";
import userRouter from "../routes/users.js";
import authRouter from "../routes/auth.js";
import { errorMiddleware } from "../middlewares/error.js";
import customerRouter from "../routes/customers.js";
import homeRouter from "../routes/home-routes.js";

const registerRoutes = (app) => {
    app.use(express.json()); ///convert json to object this is a middleware
    app.use("/", homeRouter);
    app.use("/api/v1/genres", genreRouter);
    app.use("/api/v1/movies", movieRouter);
    app.use("/api/v1/rentals", rentalRouter);
    app.use("/api/v1/customers", customerRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/auth", authRouter);
    app.use(errorMiddleware);
};
export default registerRoutes;