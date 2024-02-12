import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card, Tooltip, Carousel, Button } from "antd";
import Question from "./Question";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Quiz from "./Quiz";
export default function ClickStyle(props: {
  questions: any[];
  carouselRef: React.RefObject<any>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  analytics_clicks: any[];
  analytics_time: any[];
  setAnalyticsClicks: React.Dispatch<React.SetStateAction<any[]>>;
  setAnalyticsTime: React.Dispatch<React.SetStateAction<any[]>>;
  SendAnalytics: (email: string) => void;
  analytics_glossary_hover: { [key: string]: number };
  setAnalyticsGlossaryHover: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
}) {
  // Workaround: The following three lines is a workaround for destructuring the props for useEffect
  const currentPage = props.currentPage;
  const analytics_time = props.analytics_time;
  const setAnalyticsTime = props.setAnalyticsTime;
  const [glossary] = React.useState({
    sometimes: "a test phrase",
  } as Object);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Purpose: increments the time for the current page
      const newAnalyticsTime = analytics_time;
      newAnalyticsTime[currentPage]++;
      setAnalyticsTime(newAnalyticsTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPage, analytics_time, setAnalyticsTime]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Purpose: handles the hover event for the glossary
  const GlossaryHover = (e: React.MouseEvent) => {
    const word = (e.target as HTMLElement).innerText.toLowerCase();

    const newAnalyticsGlossaryHover = props.analytics_glossary_hover;
    newAnalyticsGlossaryHover[word] += 1;
  };
  const GoForward = () => {
    // last page is introduction page + questions.length
    if (props.currentPage >= props.questions.length) {
      return;
    }
    props.carouselRef.current.next();
    // Purpose: increments the forward clicks for the current page
    const newAnalyticsClicks = props.analytics_clicks;
    newAnalyticsClicks[props.currentPage].forwardClicks++;
    props.setAnalyticsClicks(newAnalyticsClicks);

    props.setCurrentPage(props.currentPage + 1);
  };
  const GoBack = () => {
    if (props.currentPage === 0) {
      return;
    }
    props.carouselRef.current.prev();
    // Purpose: increments the back clicks for the current page
    const newAnalyticsClicks = props.analytics_clicks;
    newAnalyticsClicks[props.currentPage].backClicks++;
    props.setAnalyticsClicks(newAnalyticsClicks);
    props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <div className="">
      <Carousel
        className="d-flex flex-column justify-content-center"
        dots={false}
        ref={props.carouselRef}
      >
        <Card hoverable className={`${styles.card} p-5 mt-5`}>
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
                glossary={glossary}
                GlossaryHover={GlossaryHover}
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
      <div className="w-100 d-flex justify-content-center gap-3 p-5">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Start Quiz
        </Button>
      </div>
      <Quiz isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
