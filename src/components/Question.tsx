import React from "react";

export default function QuestionBox(props: {
  questionNumber: number;
  question: string;
  response: string;
}) {
  return (
    <>
      <h1>Question #{props.questionNumber}</h1>
      <p>{props.question}</p>
      <h2>Response</h2>
      <p>{props.response}</p>
    </>
  );
}
