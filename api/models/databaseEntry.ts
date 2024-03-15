import mongoose from "mongoose";

const llmResponseSchema = new mongoose.Schema({
  email: String,
  day: Number,
  questions: Object,
  helplineClicks: Number,
  homePageClicks: Number,
  glossaryHover: Map,
  quiz: Object,
});

export const llmResponse = mongoose.model("llm", llmResponseSchema);
