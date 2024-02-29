import { ReactNode } from "react";

export interface AnalyticsContextProps {
  initializeQuestionAnalytics: (questionData: QuestionData[]) => void;
  incrementForwardClicks: (index: number) => void;
  incrementBackClicks: (index: number) => void;
  incrementHelplineClicks: () => void;
  incrementDirectClicks: (index: number) => void;
  incrementGlossaryHover: (term: string) => void;
  incrementHomePageClicks: () => void;
  incrementQuestionTime: () => void;
  changePageNumber: (operation?: "add" | "set", pageNum?: number) => void;
  getPageNumber: () => number;
  sendAnalytics: (quizData: any) => void;
}

export interface AnalyticsProviderProps {
  children: ReactNode;
}

export interface QuestionClicks {
  question: string;
  backClicks: number;
  forwardClicks: number;
  directClicks: number;
  time: number;
}

// this is what I'm going to get from the server
export interface QuestionData {
  "LLM Response": string;
  "Question (Reddit post)": string;
  "Reddit response": string;
}
