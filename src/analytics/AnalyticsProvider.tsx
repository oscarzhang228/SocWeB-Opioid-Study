// analytics/AnalyticsProvider.tsx
import React, { createContext, useContext } from "react";
import {
  AnalyticsContextProps,
  AnalyticsProviderProps,
  QuestionClicks,
  QuestionData,
} from "./AnalyticsTypes";

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
  const glossaryHover: { [key: string]: number } = {};

  const incrementGlossaryHover = (term: string) => {
    if (glossaryHover[term]) {
      glossaryHover[term]++;
    } else {
      console.error("Glossary term not found");
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
  };

  return (
    <AnalyticsContext.Provider value={analyticsContextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
