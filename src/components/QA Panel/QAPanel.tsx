import { Carousel, Card, Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Question from "../Question/Question";
import styles from "./QAPanel.module.scss";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import { useEffect, useRef, useState } from "react";
import TextResizeControls from "../TextResizeControls/TextResizeControls";

const TEXT_RATIO_CHANGE = 0.1;
const MIN_TEXT_RATIO = 0.75;
const MAX_TEXT_RATIO = 1.5;
const COMPLETIONLINKS: { [key: string]: string } = {
  day1Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day2Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day3Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day4Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day5Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day6Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day7Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day8Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day9Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day10Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day11Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day12Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day13Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day14Version1: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day1Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day2Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day3Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day4Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day5Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day6Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day7Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day8Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day9Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day10Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day11Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day12Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day13Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
  day14Version2: "https://app.prolific.com/submissions/complete?cc=C1L467WZ",
};

type QAPanelProps = {
  questions: any[];
  carouselRef: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabledForwardButton: boolean;
  changeDisabledForwardButton: React.Dispatch<React.SetStateAction<boolean>>;
  disabledBackButton: boolean;
  changeDisabledBackButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>;
  showQuizButton: boolean;
};
/**
 * This component is used to display the questions and responses in a carousel
 * @param {{
 *   questions: any[]; quesetion array for current questions
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
export default function QAPanel(props: QAPanelProps) {
  const {
    questions,
    carouselRef,
    setIsModalOpen,
    disabledForwardButton,
    changeDisabledBackButton,
    changeDisabledForwardButton,
    disabledBackButton,
    setShowQuizButton,
    showQuizButton,
  } = props;
  const { changePageNumber, incrementQuestionTime, getPageNumber } =
    useAnalytics();
  const [currentTextRatio, changeTextRatio] = useState<number>(1);

  // used to get the font-size of the questions at the start
  const homeRef = useRef<HTMLParagraphElement>(null);
  const [defaultFontSize, changeDefaultFontSize] = useState<number>(-1);

  const day = new URL(window.location.toString()).searchParams.get("day");
  const version = new URL(window.location.toString()).searchParams.get(
    "version"
  );

  const questionStyleOverrides = {
    fontSize:
      defaultFontSize > -1
        ? currentTextRatio * defaultFontSize + "px"
        : "inherit",
  };

  /**
   * This function is used to change the text size
   * @param {number} change the amount to change the text by
   **/
  const handleTextResize = (change: number) => {
    // if the default font size is not set then set it
    if (defaultFontSize === -1) {
      changeDefaultFontSize(
        parseFloat(getComputedStyle(homeRef.current!).fontSize)
      );
    }

    // if within bounds then change the text change
    if (
      currentTextRatio + change <= MAX_TEXT_RATIO &&
      currentTextRatio + change >= MIN_TEXT_RATIO
    ) {
      changeTextRatio(currentTextRatio + change);
    } else {
      console.log("Text size out of bounds");
      return;
    }
  };

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
    carouselRef!.current.prev();

    showQuizIfLastPage();
    handleBackButtonDisable();
    handleForwardButtonDisable();
  };

  /**
   * This function is used to go forward to the next question
   */
  const goForward = () => {
    if (getPageNumber() === questions.length) {
      throw new Error(
        "Should not be able to go forward when button is disabled on the last page"
      );
    }

    // change the page number and move the carousel to the next page
    changePageNumber("add");
    carouselRef!.current.next();

    showQuizIfLastPage();
    handleBackButtonDisable();
    handleForwardButtonDisable();
  };

  /**
   * This function is used to show the quiz button if we are on the last page
   */
  const showQuizIfLastPage = () => {
    if (getPageNumber() === questions.length) {
      setShowQuizButton(true);
    } else {
      setShowQuizButton(false);
    }
  };

  /**
   * This function is used to disable the back button on the first page and renable on any other page
   */
  const handleBackButtonDisable = () => {
    if (getPageNumber() === 0) {
      changeDisabledBackButton(true);
    } else {
      changeDisabledBackButton(false);
    }
  };
  /**
   * This function is used to disable the back button on the last page and renable on any other
   */
  const handleForwardButtonDisable = () => {
    if (getPageNumber() === questions.length) {
      changeDisabledForwardButton(true);
    } else {
      changeDisabledForwardButton(false);
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
    <section className="d-flex flex-column justify-content-center pt-md-5 pt-xs-3">
      <Carousel
        dots={false}
        ref={carouselRef}
        adaptiveHeight={true}
        className={styles["QAPanel-Carousel"]}
        draggable={false}
        infinite={false} // Disable infinite loop
        swipe={false}
      >
        <Card hoverable className={`${styles["QAPanel-Card"]} `}>
          <p
            className={`text-left ${styles["Card-Home"]}`}
            ref={homeRef}
            style={questionStyleOverrides}
          >
            Hello, <br />
            Thank you for consenting to participate in our study! <br /> <br />
            <span className="underline">What to do:</span>
            {""} Please carefully read through the following questions and their
            corresponding responses, related to opioid use disorder (OUD).
            Navigate through the questions using the left/right arrow buttons (
            <Button shape="circle" icon={<LeftOutlined />} size="small" />
            <Button shape="circle" icon={<RightOutlined />} size="small" />
            ) provided below. <br /> <br />
            You may search the meaning of any unknown terms that appear using
            search engines such as Google. As and when applicable, we also
            provide a brief description of OUD related terms, highlighted in
            bold. The description can be accessed by{" "}
            <Tooltip title="Hover to get a brief description of the word/phrase">
              <strong>hovering</strong>
            </Tooltip>{" "}
            over the bolded terms. You may zoom in/out of the content
            (increase/decrease the font size) using the +/- buttons (
            <Button size="small">+</Button> <Button size="small">-</Button>).{" "}
            <br /> <br />
            <span className="underline">What not to do:</span>
            {""} Please refrain from using any large language model or
            generative AI powered search tools such as ChatGPT or Google Bard.
            We also ask that you restrict yourself from consuming any other
            OUD-related content other than what is being provided to you. <br />
            <br />
            <span className="underline">
              Required Quiz and Compensation:
            </span>{" "}
            After reading through the questions and their responses, please
            complete the short “required” quiz. The quiz can be accessed by
            clicking on the “start quiz” button (
            <Button size="small" type="primary">
              Start Quiz
            </Button>
            ), which appears after navigating through all the questions.
            Successful completion of reading the content and taking the quiz
            would provide a daily compensation of $2, amounting to a total of
            $30 for the entire duration of two weeks. <br /> <br />
            <span className="underline">
              Helplines and Contact Information:
            </span>{" "}
            {""}
            As a reminder, your participation is entirely voluntary and you may
            discontinue participation at any time. If at any point in this
            study, you feel distressed, please call the Substance Abuse and
            Mental Health Services Administration (SAMHSA) National Helpline at
            1-800-662-HELP (4357). The Helpline is free and available 24/7 and
            can help you find local resources to help with any mental health or
            substance use concerns. You can also find an online listing of
            treatment programs in your area through the{" "}
            <a
              href="https://findtreatment.gov/"
              target="_blank"
              rel="noreferrer"
            >
              SAMHSA Treatment Services Locator
            </a>
            . If you have any questions about the study, you may contact our
            research team at{" "}
            <a href="mailto:smittal87@gatech.edu">smittal87@gatech.edu</a>.
            Additionally, if you have any questions about your rights as a
            research participant, you may contact the Georgia Institute of
            Technology Office of Research Integrity Assurance at{" "}
            <a href="mailto:IRB@gatech.edu" target="_blank" rel="noreferrer">
              IRB@gatech.edu
            </a>
            . <br /> <br />
            Thank you for your time and participation!
          </p>
        </Card>
        {questions.map((data, index) => {
          // get which version to show based on the url query. 1 is Reddit and 2 is GPT
          const params = new URL(window.location.toString()).searchParams;
          const version = params.get("version");

          if (version !== "1" && version !== "2") {
            throw new Error("Invalid version");
          }
          const response =
            version === "1" ? data["Reddit response"] : data["LLM response"];
          return (
            <Card
              className={`${styles["QAPanel-Card"]} w-100 h-100`}
              hoverable
              key={index}
              id={`question-${index + 1}`}
            >
              <Question
                questionNumber={index + 1}
                question={data["Question (Reddit post)"]}
                response={response}
                questionStyleOverride={questionStyleOverrides}
              />
            </Card>
          );
        })}
        <Card hoverable className={`${styles["QAPanel-Card"]}  `}>
          <p className={`text-center ${styles["QAPanel-NonQuestion"]}`}>
            Thank you so much for participating and going through the content
            and the quiz. Your participation is greatly appreciated. Please go
            to <a href={COMPLETIONLINKS[`day${day}Version${version}`]}> here</a>{" "}
            to complete your session.
          </p>
        </Card>
      </Carousel>
      <section className="align-self-end">
        <TextResizeControls
          defaultRatioChange={TEXT_RATIO_CHANGE}
          handleTextResize={handleTextResize}
        />
      </section>
      <section className="p-3 w-100 d-flex justify-content-center gap-2">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          disabled={disabledBackButton}
          onClick={goBack}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          disabled={disabledForwardButton}
          onClick={goForward}
        />
      </section>
      <section className="d-flex justify-content-center">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          style={{ visibility: showQuizButton ? "visible" : "hidden" }}
          type="primary"
        >
          Start Quiz
        </Button>
      </section>
    </section>
  );
}
