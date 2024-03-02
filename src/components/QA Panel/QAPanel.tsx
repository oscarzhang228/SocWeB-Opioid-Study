import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Question from "../Question/Question";
import styles from "./QAPanel.module.scss";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import { useEffect } from "react";

/**
 * This component is used to display the questions and responses in a carousel
 * @param {{
 *   questions: any[]; quesetion array for curernt questions
 *   carouselRef: any; reference to the carousel
 *   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; function to open the modal
 *   disabledForwardButton: boolean; state to disable the forward button
 *   changeDisabledForwardButton: React.Dispatch<React.SetStateAction<boolean>>; function to change the state of the forward button
 *   disabledBackButton: boolean; state to disable the back button
 *   changeDisabledBackButton: React.Dispatch<React.SetStateAction<boolean>>; function to change the state of the back button
 *   setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>; function to change the state of the quiz button
 *   showQuizButton: boolean; state to show the quiz button
 * }} props
 * @return {*}
 */
export default function QAPanel(props: {
  questions: any[];
  carouselRef: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabledForwardButton: boolean;
  changeDisabledForwardButton: React.Dispatch<React.SetStateAction<boolean>>;
  disabledBackButton: boolean;
  changeDisabledBackButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>;
  showQuizButton: boolean;
}) {
  const { changePageNumber, incrementQuestionTime, getPageNumber } =
    useAnalytics();

  // ==========================================
  // Section: Carousel Controls
  // ==========================================

  /**
   * This function is used to go back to the previous question
   */
  const goBack = () => {
    if (getPageNumber() === 0) {
      throw new Error(
        "Should not be able to go back when back button is disabled"
      );
    }

    // change the page number and move the carousel to the previous page
    changePageNumber();
    props.carouselRef!.current.prev();

    // if we are at the last page then show quiz else hide it
    if (getPageNumber() === props.questions.length) {
      props.setShowQuizButton(true);
    } else if (props.showQuizButton) {
      props.setShowQuizButton(false);
    }

    // if the forward button is disabled then enable it unless we are on the last page before thank you
    if (
      props.disabledForwardButton &&
      getPageNumber() !== props.questions.length
    ) {
      props.changeDisabledForwardButton(false);
    }

    // if first question, disable back button
    if (getPageNumber() === 0) {
      props.changeDisabledBackButton(true);
    }
  };

  /**
   * This function is used to go forward to the next question
   */
  const goForward = () => {
    if (getPageNumber() === props.questions.length) {
      throw new Error(
        "Should not be able to go forward when button is disabled on the last page"
      );
    }

    // change the page number and move the carousel to the next page
    changePageNumber("add");
    props.carouselRef!.current.next();

    // if the back button is disabled the enable it
    if (props.disabledBackButton) {
      props.changeDisabledBackButton(false);
    }

    // if final question, disable forward button and show quiz button
    if (getPageNumber() === props.questions.length) {
      props.setShowQuizButton(true);
      props.changeDisabledForwardButton(true);
    }
  };

  /**
   * This hook is used to increment the time spent on the question every second.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      incrementQuestionTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [incrementQuestionTime]);

  return (
    <div className="d-flex flex-column justify-content-center pt-md-5 pt-xs-3">
      <Carousel
        dots={false}
        ref={props.carouselRef}
        adaptiveHeight={true}
        className={styles["QAPanel-Carousel"]}
      >
        <Card hoverable className={`${styles["QAPanel-Card"]} p-3 pb-0 mt-5`}>
          <p className={`text-center ${styles["QAPanel-NonQuestion"]}`}>
            Thank you for consenting to participate in our study! Following are
            some questions and their corresponding response, related to Opioid
            Use Disorder. Please read through them carefully. You may search the
            meaning of any unknown terms that appear throughout the document. As
            a reminder, your participation is entirely voluntary, and you may
            discontinue participation at any time. After going through the
            following content, you will be asked to take a short{" "}
            <strong>required quiz</strong> to help us gauge your overall
            understanding.
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
        <Card hoverable className={`${styles["QAPanel-Card"]}  p-3 pb-0 mt-5`}>
          <p className={`text-center ${styles["QAPanel-NonQuestion"]}`}>
            Thank you so much for participating and going through the content
            and the quiz. Your participation is greatly appreciated and today's
            session is now complete.
          </p>
        </Card>
      </Carousel>
      <div className="p-3 w-100 d-flex justify-content-center gap-2">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          disabled={props.disabledBackButton}
          onClick={goBack}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          disabled={props.disabledForwardButton}
          onClick={goForward}
        />
      </div>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => {
            props.setIsModalOpen(true);
          }}
          style={{ visibility: props.showQuizButton ? "visible" : "hidden" }}
          type="primary"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
