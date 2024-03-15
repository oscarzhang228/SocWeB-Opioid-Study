import mongoose from "mongoose";

const databaseEntrySchema = new mongoose.Schema({
  email: String,
  day: Number,
  questions: Object,
  helplineClicks: Number,
  homePageClicks: Number,
  glossaryHover: Map,
  quiz: Object,
});

export const llmResponse = mongoose.model("llm", databaseEntrySchema);
export const redditResponse = mongoose.model("reddit", databaseEntrySchema);
