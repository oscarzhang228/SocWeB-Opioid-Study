import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card, Tooltip } from "antd";
import Question from "./Question";

export default function QuestionBox(props: { questions: any[] }) {
  return (
    <div className={`d-flex flex-column ${styles["card-container"]} p-3 gap-2`}>
      <Card hoverable id="home">
        <p className="text-center">
          Thank you for consenting to{" "}
          <Tooltip placement="topLeft" title={"This is a proof of concept"}>
            <strong>participate</strong>
          </Tooltip>{" "}
          in our study! Following are some questions and their corresponding
          response, related to Opioid Use Disorder. Please read through them
          carefully. You may search the meaning of any unknown terms that appear
          throughout the document. As a reminder, your participation is entirely
          voluntary, and you may discontinue participation at any time. After
          going through the following content, you will be asked to answer a few
          questions to help us gauge your overall understanding.
        </p>
      </Card>
      {props.questions.map((data, index) => {
        return (
          <Card
            className={`${styles.card} p-5 w-100`}
            hoverable
            key={index}
            id={`question-${index + 1}`}
          >
            {/* <Question
              questionNumber={index + 1}
              question={data["Question (Reddit post)"]}
              response={data["Reddit response"]}
            /> */}
          </Card>
        );
      })}

      <Card hoverable>
        <p className="text-center">
          Thank you so much for participating and going through the document!
        </p>
      </Card>
    </div>
  );
}
