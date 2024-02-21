import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Question from "../Question/Question";
import styles from "./QAPanel.module.scss";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import { useEffect } from "react";
export default function QAPanel(props: { questions: any[]; carouselRef: any }) {
  const { changePageNumber, incrementQuestionTime, getPageNumber } =
    useAnalytics();

  // ==========================================
  // Section: Carousel Controls
  // ==========================================
  const goBack = () => {
    console.log(getPageNumber());
    if (getPageNumber() === 0) {
      return;
    }
    changePageNumber("subtract");
    props.carouselRef!.current.prev();
  };

  const goForward = () => {
    console.log(getPageNumber());
    if (getPageNumber() === props.questions.length) {
      return;
    }
    changePageNumber("add");

    props.carouselRef!.current.next();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      incrementQuestionTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [incrementQuestionTime]);

  return (
    <div className="d-flex flex-column justify-content-center h-100">
      <Carousel dots={false} ref={props.carouselRef} adaptiveHeight={true}>
        <Card hoverable className={`${styles["QAPanel-Card"]} p-3 pb-0 mt-5`}>
          <p className="text-center">
            Thank you for consenting to participate in our study! Following are
            some questions and their corresponding response, related to Opioid
            Use Disorder. Please read through them carefully. You may search the
            meaning of any unknown terms that appear throughout the document. As
            a reminder, your participation is entirely voluntary, and you may
            discontinue participation at any time. After going through the
            following content, you will be asked to answer a few questions to
            help us gauge your overall understanding.
          </p>
        </Card>
        {props.questions.map((data, index) => {
          return (
            <Card
              className={`${styles["QAPanel-Card"]} p-3 pb-0 w-100 h-100`}
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
        <Card hoverable className={`${styles["QAPanel-Card"]} p-3 pb-0 mt-5`}>
          <p className="text-center">
            Thank you so much for participating and going through the content
            and the quiz. Your participation is greatly appreciated and today's
            session is now complete.
          </p>
        </Card>
      </Carousel>
      <div className="pt-2 w-100 d-flex justify-content-end">
        <Button shape="circle" icon={<LeftOutlined />} onClick={goBack} />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={goForward}
        />{" "}
      </div>
    </div>
  );
}
