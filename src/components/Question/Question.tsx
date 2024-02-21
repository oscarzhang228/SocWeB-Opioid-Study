import { Tooltip } from "antd";
import { useGlossaryTooltip } from "../../hooks/useGlossaryTooltip";
import { useState } from "react";
import styles from "./Question.module.scss";
export default function Question(props: {
  questionNumber: number;
  question: string;
  response: string;
}) {
  const [question] = useState(useGlossaryTooltip(props.question));
  const [response] = useState(useGlossaryTooltip(props.response));

  return (
    <div className={styles.Question}>
      <div className={`p-4`}>
        <h1>Question #{props.questionNumber}</h1>
        <p>{question}</p>
      </div>
      <div className="p-4">
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
