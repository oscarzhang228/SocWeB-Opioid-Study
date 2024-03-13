import fs from "fs";
import Papa from "papaparse";
import { Request, Response } from "express";
import process from "process";

const csvFilePath = process.cwd() + "/src/data/questions.csv";
const numQuestionsPerDay = 8;
/**
 * This file contains the questions and responses for the chatbot.
 * The questions are organized by day, and each day contains an array of questions.
 * Responses are sent based on the day number
 * @module api/questions
 * @param day - The day number in a query string
 */
export default async (req: Request, res: Response) => {
  const { day } = req.query;
  const dayNumber = parseInt(day as string);
  const csvFile = fs.readFileSync(csvFilePath, "utf8");

  // Parse the CSV file
  Papa.parse(csvFile, {
    header: true,
    complete: function (results: any) {
      // get one day's questions based on the day number in the query string and send it as a response. 1st day would have first 8. second day would have second 8, etc.
      // if the day number is 13 or 14 then send one less question because the last two days have 1 less question
      let previousDaysQuestions = (dayNumber - 1) * numQuestionsPerDay;
      let dayQuestions = null;
      if (dayNumber === 13 || dayNumber === 14) {
        if (dayNumber === 14) {
          previousDaysQuestions -= 1;
        }

        dayQuestions = results.data.slice(
          previousDaysQuestions,
          previousDaysQuestions + numQuestionsPerDay - 1
        );
      } else {
        dayQuestions = results.data.slice(
          previousDaysQuestions,
          dayNumber * numQuestionsPerDay
        );
      }
      res.send(dayQuestions);
    },
  });
};
