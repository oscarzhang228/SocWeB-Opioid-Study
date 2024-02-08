import styles from "../scss/QuestionBox.module.scss";
import { Tooltip } from "antd";
export default function QuestionBox(props: {
  questionNumber: number;
  question: string;
  response: string;
  glossary: any;
}) {
  // Workaround: inert attribute is not supported in Typescript right now
  const isInert = true;

  // Purpose: puts words into a tooltip if they are in the glossary
  const ParseString = (parse_string_props: { input_string: string }) => {
    const segmenter = new Intl.Segmenter([], {
      granularity: "word",
    });
    // grabs the words from the input string
    const parts = Array.from(
      segmenter.segment(parse_string_props.input_string)
    ).map((part) => part.segment);

    return (
      <>
        {parts.map((part, index): JSX.Element => {
          if (props.glossary[part.toLowerCase()] !== undefined) {
            return (
              <Tooltip
                placement="topLeft"
                title={props.glossary[part.toLowerCase()]}
                key={index}
              >
                <strong>{part}</strong>
              </Tooltip>
            );
          }
          return (
            <span {...{ inert: isInert ? "" : undefined }} key={index}>
              {part}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className={`${styles["card-question"]} p-4`}>
        <h1>Question #{props.questionNumber}</h1>
        <p>
          <ParseString input_string={props.question}></ParseString>
        </p>
      </div>
      <div className="p-4">
        <h2>Response</h2>
        <ParseString input_string={props.response}></ParseString>
      </div>
    </>
  );
}
