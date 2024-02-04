import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card, Tooltip, Carousel, Button } from "antd";
import Question from "./Question";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function ClickStyle(props: { questions: any[] }) {
  const carouselRef = React.useRef<any>(null);
  let pageNumber = 0;
  const lastPage = 7;
  const GoForward = () => {
    if (pageNumber === lastPage) return;
    carouselRef.current.next();
    pageNumber++;
  };
  const GoBack = () => {
    if (pageNumber === 0) return;
    carouselRef.current.prev();
    pageNumber--;
  };
  return (
    <div className="">
      <Carousel
        className="d-flex flex-column justify-content-center"
        dots={false}
        ref={carouselRef}
      >
        <Card hoverable className="p-5 mt-5">
          <p className="text-center">
            Thank you for consenting to{" "}
            <Tooltip placement="topLeft" title={"This is a proof of concept"}>
              <strong>participate</strong>
            </Tooltip>{" "}
            in our study! Following are some questions and their corresponding
            response, related to Opioid Use Disorder. Please read through them
            carefully. You may search the meaning of any unknown terms that
            appear throughout the document. As a reminder, your participation is
            entirely voluntary, and you may discontinue participation at any
            time. After going through the following content, you will be asked
            to answer a few questions to help us gauge your overall
            understanding.
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
              <Question
                questionNumber={index + 1}
                question={data["Question (Reddit post)"]}
                response={data["Reddit response"]}
              />
            </Card>
          );
        })}
      </Carousel>
      <div className="w-100 d-flex justify-content-center gap-3 p-5">
        <Button shape="circle" icon={<LeftOutlined />} onClick={GoBack} />
        <Button shape="circle" icon={<RightOutlined />} onClick={GoForward} />
      </div>
    </div>
  );
}
