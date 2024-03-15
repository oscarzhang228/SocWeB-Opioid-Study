import mongoose, { ConnectOptions } from "mongoose";
import { Request, Response } from "express";

const redditResponseSchema = new mongoose.Schema({
  email: String,
  day: Number,
  questions: Object,
  helplineClicks: Number,
  homePageClicks: Number,
  glossaryHover: Map,
  quiz: Object,
});

const redditResponse = mongoose.model("User", redditResponseSchema);

const uri = `mongodb+srv://shravika16093:${process.env.MONGO_KEY}@oud-project.qhb8ogk.mongodb.net/Analytics?retryWrites=true&w=majority&appName=OUD-Project`;

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
    const reddit = await redditResponse.create(req.body);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};
