import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card, Tooltip, Carousel, Button } from "antd";
import Question from "./Question";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function ClickStyle() {
  const carouselRef = React.useRef<any>(null);
  let pageNumber = 0;
  const lastPage = 2;
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
    <div>
      <Carousel
        className="d-flex flex-column justify-content-center"
        dots={false}
        ref={carouselRef}
      >
        <Card hoverable>
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
        <Card className={`${styles.card} p-5 w-100`} hoverable>
          <Question
            questionNumber={1}
            question="I have been having various discussions over on r/opiates and I have read
              that methadone clinics are decreasing and the trend is for suboxone to
              be used as an opiate replacement medicine. Is this the case in general?
              Same question has been posted in r/opiatesrecovery. I hope this is
              allowed!?"
            response="To be honest, I think suboxone is going to stop working for everyone
              because everyone is gonna be doing fentanyl and we all know the horrors
              of precipitated withdrawals."
          />
        </Card>
        <div>
          <h2>Hello</h2>
        </div>
        <div></div>
      </Carousel>
      <div className="w-100 d-flex justify-content-center gap-3 p-5">
        <Button shape="circle" icon={<LeftOutlined />} onClick={GoBack} />
        <Button shape="circle" icon={<RightOutlined />} onClick={GoForward} />
      </div>
    </div>
  );
}
