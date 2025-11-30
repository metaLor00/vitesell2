import express from "express";
import validate from "../utils/validate.js";
import { Rental, rentalValidationSchemas } from "../models/rental.js";
import { Customer } from "../models/customer.js";
import { Movie } from "../models/movie.js";
import mongoose from "mongoose";

const rentalRouter = express.Router();

rentalRouter.get("/", validate(rentalValidationSchemas), async (req, res) => {
  const rentals = await Rental.find().select("-__v").sort("-rentalDate");
  res.status(200).json(rentals);
});

rentalRouter.get("/:id", validate(rentalValidationSchemas), async (req, res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    res.status(200).json(rental);
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

rentalRouter.post("/", validate(rentalValidationSchemas), async (req, res) => {
  const validatedBody = req.validatedBody;

  const customer = await Customer.findById(validatedBody.customerId);
  if (!customer) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }

  const movie = await Movie.findById(validatedBody.movieId);
  if (!movie) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  if (movie.numberInStock === 0) {
    return res.status(400).json({ message: "Movie not in stock" });
  }

  const rental = new Rental({
    ...validatedBody,
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // ---------------------------
  // ✅ Use Session (Transaction)
  //stop all mongod proccessand taskkill /F /IM mongod.exe
 ///then run this in powershell admin: mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data" --replSet rs0
  /// then in mongoshell in compass run: rs.initiate()
  // ---------------------------
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await rental.save({ session });

    await Movie.updateOne(
      { _id: movie._id },
      { $inc: { numberInStock: -1 } },
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(rental);
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted:", error);
    res.status(500).json({ message: "Something failed during rental creation" });
  } finally {
    session.endSession();
  }
});

export default rentalRouter;
