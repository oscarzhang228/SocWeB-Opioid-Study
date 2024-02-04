import React from "react";
import styles from "../scss/QuestionBox.module.scss";
export default function QuestionBox(props: {
  questionNumber: number;
  question: string;
  response: string;
}) {
  return (
    <>
      <div className={`${styles["card-question"]} p-4`}>
        <h1>Question #{props.questionNumber}</h1>
        <p>{props.question}</p>
      </div>
      <div className="p-4">
        <h2>Response</h2>
        <p>{props.response}</p>
      </div>
    </>
  );
}
