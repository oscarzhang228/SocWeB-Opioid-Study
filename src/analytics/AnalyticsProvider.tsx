// analytics/AnalyticsProvider.tsx
import React, { createContext, useContext, useState } from "react";
import {
  AnalyticsContextProps,
  AnalyticsProviderProps,
  QuestionClicks,
  QuestionData,
} from "./AnalyticsTypes";
import axios from "axios";
import { QuizData } from "../pages/quizTypes";

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(
  undefined
);

/**
 * This hook is used to get the analytics context
 * @returns the analytics context
 */
export const useAnalytics = (): AnalyticsContextProps => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

const questionAnalytics: QuestionClicks[] = [];

/**
 * This component is used to provide the analytics context to the application.
 * @param param0 contains the children of the provider
 * @returns The analytics provider
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  /**
   * Initalizes the question analytics array with the question data from the server
   * @param questionData the question data from the server
   */
  const initializeQuestionAnalytics = (questionData: QuestionData[]) => {
    if (questionAnalytics.length !== 0) {
      return;
    }

    questionData.forEach((q, index) => {
      questionAnalytics.push({
        question: q["Question (Reddit post)"],
        backClicks: 0,
        forwardClicks: 0,
        directClicks: 0,
        time: 0,
      });
    });
  };

  /**
   * This function is used to increment the forward clicks of a question
   * @param index the index of the question
   */
  const incrementForwardClicks = (index: number) => {
    questionAnalytics[index]["forwardClicks"]++;
  };

  /**
   * This function is used to increment the back clicks of a question
   * @param index the index of the question
   */
  const incrementBackClicks = (index: number) => {
    questionAnalytics[index]["backClicks"]++;
  };

  /**
   * This function is used to increment the direct clicks of a question
   * @param index the index of the question
   */
  const incrementDirectClicks = (index: number) => {
    questionAnalytics[index]["directClicks"]++;
  };

  /**
   * This function is used to increment the time spent on a question
   */
  const incrementQuestionTime = () => {
    if (questionAnalytics[pageNumber]) {
      questionAnalytics[pageNumber]["time"]++;
    }
  };
  // ==========================================
  // Section: Treatment Helpline Analytics
  // ==========================================
  let helplineClicks: number = 0;

  /**
   * This function is used to increment the helpline clicks
   */
  const incrementHelplineClicks = () => {
    helplineClicks++;
  };

  // ==========================================
  // Section: Home Page Analytics
  // ==========================================
  let homePageClicks: number = 0;

  /**
   * This function is used to increment the home page clicks
   */
  const incrementHomePageClicks = () => {
    homePageClicks++;
  };
  // ==========================================
  // Section: Glossary Analytics
  // ==========================================
  // glossary is hardcoded in the useGlossaryTooltip.tsx file
  const glossaryHover: { [key: string]: number } = {};

  /**
   * This function is used to increment the glossary hover
   * @param term the term that was hovered over
   */
  const incrementGlossaryHover = (term: string) => {
    if (glossaryHover[term]) {
      glossaryHover[term]++;
    } else {
      glossaryHover[term] = 1;
    }
  };

  // ==========================================
  // Section: Sending Analytics
  // =========================================

  /**
   * This function is used to send the analytics to the server
   * @param quizData the quiz data from the front-end
   */
  const sendAnalytics = (quizData: QuizData) => {
    // get the email from the quiz data for use as the primary key
    const prolificId = quizData.prolificId;
    delete quizData.prolificId;

    const params = new URL(window.location.toString()).searchParams;
    const day = params.get("day");
    // version 1 is reddit responses version 2 is LLM
    const version = params.get("version");

    const analytics = {
      prolificId: prolificId,
      day: day,
      questions: questionAnalytics,
      helplineClicks: helplineClicks,
      homePageClicks: homePageClicks,
      glossaryHover: glossaryHover,
      quiz: quizData,
    };

    if (version === "1") {
      axios.post("api/redditAnalytics", analytics).then((res) => {
        console.log(res.data);
      });
    } else if (version === "2") {
      axios.post("api/llmAnalytics", analytics).then((res) => {
        console.log(res.data);
      });
    }
  };

  // ==========================================
  // Section: Provider Setup
  // ==========================================

  const analyticsContextValue: AnalyticsContextProps = {
    initializeQuestionAnalytics,
    incrementBackClicks,
    incrementForwardClicks,
    incrementHelplineClicks,
    incrementDirectClicks,
    incrementHomePageClicks,
    incrementGlossaryHover,
    setPageNumber,
    incrementQuestionTime,
    pageNumber,
    sendAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={analyticsContextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
