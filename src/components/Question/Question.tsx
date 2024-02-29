import { useGlossaryTooltip } from "../../hooks/useGlossaryTooltip";
import { useState } from "react";
import styles from "./Question.module.scss";

/**
 * This component is used to display the question and response
 * @param {{
 *   questionNumber: number; question number
 *   question: string; question
 *   response: string; response
 * }} props
 * @return {*}
 */
export default function Question(props: {
  questionNumber: number;
  question: string;
  response: string;
}) {
  const [question] = useState(useGlossaryTooltip(props.question));
  const [response] = useState(useGlossaryTooltip(props.response));

  return (
    <div className={styles.QuestionResponse}>
      <div>
        <h2>Question #{props.questionNumber}</h2>
        <p>{question}</p>
      </div>
      <div>
        <h2>Response</h2>
        <p className={styles.Response}>{response}</p>
      </div>
    </div>
  );
}
