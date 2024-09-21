import { useGlossaryTooltip } from "../../hooks/useGlossaryTooltip";
import { useState } from "react";
import styles from "./Question.module.scss";

type QuestionProps = {
  questionNumber: number;
  question: string;
  heading: string;
  subheading?: string;
  response: string;
  questionStyleOverride: any;
};
/**
 * This component is used to display the question and response
 * @param {{
 *   questionNumber: number; question number
 *   question: string; question
 *   response: string; response
 *   heading: string; heading for the question
 *   subheading: string; subheading for the response
 *   questionStyleOverride: any; style overrides for the question
 * }} props
 * @return {*}
 */
export default function Question(props: QuestionProps) {
  const { questionNumber, questionStyleOverride, heading, subheading } = props;
  const [question] = useState(useGlossaryTooltip(props.question));
  const [response] = useState(useGlossaryTooltip(props.response));

  return (
    <div className={styles.QuestionResponse} style={questionStyleOverride}>
      <div>
        <h2 className={styles["QuestionResponse-Header"]}>
          {heading} {questionNumber}
        </h2>
        <p>{question}</p>
      </div>
      <div>
        <h2 className={styles["QuestionResponse-Header"]}>{subheading}</h2>
        <p className={styles.Response}>{response}</p>
      </div>
    </div>
  );
}
