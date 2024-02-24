// analytics/AnalyticsProvider.tsx
import React, { createContext, useContext } from "react";
import {
  AnalyticsContextProps,
  AnalyticsProviderProps,
  QuestionClicks,
  QuestionData,
} from "./AnalyticsTypes";
import axios from "axios";
import { useParams } from "react-router-dom";

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(
  undefined
);

export const useAnalytics = (): AnalyticsContextProps => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  // ==========================================
  // Section: Question Analytics
  // ==========================================
  let questionAnalytics: QuestionClicks[] = [];
  let pageNumber = 0;

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

  const incrementForwardClicks = (index: number) => {
    questionAnalytics[index]["forwardClicks"]++;
  };
  const incrementBackClicks = (index: number) => {
    questionAnalytics[index]["backClicks"]++;
  };
  const incrementDirectClicks = (index: number) => {
    questionAnalytics[index]["directClicks"]++;
  };

  const getPageNumber = () => {
    return pageNumber;
  };
  // input: add or subtract
  const changePageNumber = (operation: string, pageNum?: number) => {
    if (operation === "add") {
      pageNumber++;
    } else if (operation === "set" && pageNum != null) {
      pageNumber = pageNum;
    } else {
      pageNumber--;
    }
  };

  const incrementQuestionTime = () => {
    if (questionAnalytics[pageNumber]) {
      questionAnalytics[pageNumber]["time"]++;
    }
  };
  // ==========================================
  // Section: Treatment Helpline Analytics
  // ==========================================
  let helplineClicks: number = 0;

  const incrementHelplineClicks = () => {
    helplineClicks++;
  };

  // ==========================================
  // Section: Home Page Analytics
  // ==========================================
  let homePageClicks: number = 0;

  const incrementHomePageClicks = () => {
    homePageClicks++;
  };
  // ==========================================
  // Section: Glossary Analytics
  // ==========================================
  // glossary is hardcoded in the useGlossaryTooltip.tsx file
  const glossaryHover: { [key: string]: number } = {};

  const incrementGlossaryHover = (term: string) => {
    if (glossaryHover[term]) {
      glossaryHover[term]++;
    } else {
      glossaryHover[term] = 1;
    }
  };

  // ==========================================
  // Section: Sending Analytics
  // ==========================================
  const { day } = useParams();
  const sendAnalytics = (quizData: any) => {
    // get the email from the quiz data for use as the primary key
    const email = quizData.email;
    delete quizData.email;

    const analytics = {
      email: email,
      day: day,
      questions: questionAnalytics,
      helplineClicks: helplineClicks,
      homePageClicks: homePageClicks,
      glossaryHover: glossaryHover,
      quiz: quizData,
    };

    axios.put("api/analytics", analytics).then((res) => {
      console.log(res.data);
    });
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
