// analytics/AnalyticsProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";

// functions that the context will be providing
interface AnalyticsContextProps {
  initalizeQuestionAnalytics: (questionData: QuestionData[]) => void;
}

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

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  // tracked analytics
  let questionAnalytics: QuestionClicks[] = [];
  const helplineClicks: number = 0;
  const glossaryHover: { [key: string]: number } = {};

  // analytics functions

  // for each question in the questionData, add a question to the questionAnalytics with the question and 0 for the inital analytics
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

  const analyticsContextValue: AnalyticsContextProps = {
    initalizeQuestionAnalytics: initializeQuestionAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={analyticsContextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

interface QuestionClicks {
  question: string;
  backClicks: number;
  forwardClicks: number;
  directClicks: number;
  time: number;
}

// this is what I'm going to get from the server
interface QuestionData {
  "LLM Response": string;
  "Question (Reddit post)": string;
  "Reddit response": string;
}
