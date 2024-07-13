import mongoose, { ConnectOptions } from "mongoose";
import { Request, Response } from "express";

const databaseEntrySchema = new mongoose.Schema({
  email: String,
  day: Number,
  questions: Object,
  helplineClicks: Number,
  homePageClicks: Number,
  glossaryHover: Map,
  quiz: Object,
});

const llmResponse = mongoose.model("llm", databaseEntrySchema);

// process env should only be set in testing
const uri =
  process.env.MONGO_URI ||
  `mongodb+srv://shravika16093:${process.env.MONGO_KEY}@oud-project.qhb8ogk.mongodb.net/Analytics?retryWrites=true&w=majority&appName=OUD-Project`;

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

/**
 * Create a new user in the database with the data from the request body
 * @param {Object} req - The request object
 */
export default async function POST(req: Request, res: Response) {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "LLM Analytics: Successfully connected to the database to store LLM analytics."
    );

    const llm = await llmResponse.create(req.body);
    res.status(200).json(llm);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
