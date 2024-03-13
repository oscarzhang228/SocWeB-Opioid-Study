import mongoose, { ConnectOptions } from "mongoose";
import { Request, Response } from "express";

const userSchema = new mongoose.Schema({
  email: String,
  day: Number,
  questions: Object,
  helplineClicks: Number,
  homePageClicks: Number,
  glossaryHover: Map,
  quiz: Object,
});

const User = mongoose.model("User", userSchema);

const uri = `mongodb+srv://oscarzhang228:${process.env.MONGO_KEY}@analytics.myia3o8.mongodb.net/Analytics?retryWrites=true&w=majority`;
const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

/**
 * Create a new user in the database with the data from the request body
 * @param {Object} req - The request object
 */
export default async (req: Request, res: Response) => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const user = await User.create(req.body);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};