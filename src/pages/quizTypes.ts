export type QuizFormInputs = {
  prolificId: string;
  [key: `q${number}`]: string;
};

export type QuizData = {
  prolificId?: string;
  [key: `q${number}`]: Question;
};

export type Question = {
  question: string;
  answer: string;
};
