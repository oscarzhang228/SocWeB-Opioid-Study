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
      <p>
        To be honest, I think suboxone is going to stop working for everyone
        because everyone is gonna be doing fentanyl and we all know the horrors
        of precipitated withdrawals.
      </p>
    </>
  );
}
