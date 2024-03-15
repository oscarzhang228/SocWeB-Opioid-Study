// analytics/AnalyticsProvider.tsx
import React, { createContext, useContext } from "react";
import {
  AnalyticsContextProps,
  AnalyticsProviderProps,
  QuestionClicks,
  QuestionData,
} from "./AnalyticsTypes";
import axios from "axios";

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

/**
 * This component is used to provide the analytics context to the application.
 * @param param0 contains the children of the provider
 * @returns The analytics provider
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  // ==========================================
  // Section: Question Analytics
  // ==========================================
  let questionAnalytics: QuestionClicks[] = [];
  let pageNumber = 0;

  /**
   * Initalizes the question analytics array with the question data from the server
   * @param questionData the question data from the server
   */
  const initializeQuestionAnalytics = (questionData: QuestionData[]) => {
    // create a temporary array in order to avoid accidentally getting send two messages and making too big of an inital quesiton analytics array
    const temporaryQuestionAnalytics: QuestionClicks[] = [];

    questionData.forEach((q, index) => {
      temporaryQuestionAnalytics.push({
        question: q["Question (Reddit post)"],
        backClicks: 0,
        forwardClicks: 0,
        directClicks: 0,
        time: 0,
      });
    });

    questionAnalytics = temporaryQuestionAnalytics;
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
   * Getter for the current page number
   * @returns the current page number
   */
  const getPageNumber = () => {
    return pageNumber;
  };

  /**
   * This function is used to change the page number
   * @param operation the operation to perform on the page number either add or set
   * @param pageNum the page number to set
   */
  const changePageNumber = (operation?: "add" | "set", pageNum?: number) => {
    if (operation === "add") {
      pageNumber++;
    } else if (operation === "set" && pageNum != null) {
      pageNumber = pageNum;
    } else {
      pageNumber--;
    }
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
  const sendAnalytics = (quizData: any) => {
    // get the email from the quiz data for use as the primary key
    const email = quizData.email;
    delete quizData.email;

    const params = new URL(window.location.toString()).searchParams;
    const day = params.get("day");
    // version 1 is reddit responses version 2 is LLM
    const version = params.get("version");

    const analytics = {
      email: email,
      day: day,
      questions: questionAnalytics,
      helplineClicks: helplineClicks,
      homePageClicks: homePageClicks,
      glossaryHover: glossaryHover,
      quiz: quizData,
    };

    if (version === "1") {
      axios.put("api/redditAnalytics", analytics).then((res) => {
        console.log(res.data);
      });
    } else if (version === "2") {
      axios.put("api/llmAnalytics", analytics).then((res) => {
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
    changePageNumber,
    incrementQuestionTime,
    getPageNumber,
    sendAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={analyticsContextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
