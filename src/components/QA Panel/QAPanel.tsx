import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Question from "../Question/Question";
import styles from "./QAPanel.module.scss";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import { ReactNode, useEffect, useRef, useState } from "react";
import TextResizeControls from "../TextResizeControls/TextResizeControls";

const TEXT_RATIO_CHANGE = 0.1;
const MIN_TEXT_RATIO = 0.75;
const MAX_TEXT_RATIO = 1.5;

const COMPLETIONLINKS: { [key: string]: string } = {
  day1Version1: "https://app.prolific.com/submissions/complete?cc=CVCEUYL6",
  day2Version1: "https://app.prolific.com/submissions/complete?cc=C1C4NS5O",
  day3Version1: "https://app.prolific.com/submissions/complete?cc=C18I0SL0",
  day4Version1: "https://app.prolific.com/submissions/complete?cc=C1K98S0Q",
  day5Version1: "https://app.prolific.com/submissions/complete?cc=CMRSE5OT",
  day6Version1: "https://app.prolific.com/submissions/complete?cc=C1KKC9JQ",
  day7Version1: "https://app.prolific.com/submissions/complete?cc=C18OY7MR",
  day8Version1: "https://app.prolific.com/submissions/complete?cc=C2720TC6",
  day9Version1: "https://app.prolific.com/submissions/complete?cc=COHJ4EQF",
  day10Version1: "https://app.prolific.com/submissions/complete?cc=C1FUH647",
  day11Version1: "https://app.prolific.com/submissions/complete?cc=C15WI1ML",
  day12Version1: "https://app.prolific.com/submissions/complete?cc=CEEUOA3L",
  day13Version1: "https://app.prolific.com/submissions/complete?cc=C1MQDQOO",
  day14Version1: "https://app.prolific.com/submissions/complete?cc=CXGSAMP0",
  day1Version2: "https://app.prolific.com/submissions/complete?cc=CC3LCT0S",
  day2Version2: "https://app.prolific.com/submissions/complete?cc=CMHGDY9H",
  day3Version2: "https://app.prolific.com/submissions/complete?cc=CHS7NCOG",
  day4Version2: "https://app.prolific.com/submissions/complete?cc=C1IOGJVK",
  day5Version2: "https://app.prolific.com/submissions/complete?cc=C1NJCPOD",
  day6Version2: "https://app.prolific.com/submissions/complete?cc=C15KQ5OJ",
  day7Version2: "https://app.prolific.com/submissions/complete?cc=CDZLJOMZ",
  day8Version2: "https://app.prolific.com/submissions/complete?cc=C17P2D05",
  day9Version2: "https://app.prolific.com/submissions/complete?cc=CONNL5ID",
  day10Version2: "https://app.prolific.com/submissions/complete?cc=CH33FJDP",
  day11Version2: "https://app.prolific.com/submissions/complete?cc=CBJK0401",
  day12Version2: "https://app.prolific.com/submissions/complete?cc=CX34IVDJ",
  day13Version2: "https://app.prolific.com/submissions/complete?cc=CAZXA4S8",
  day14Version2: "https://app.prolific.com/submissions/complete?cc=C1LCRSFA",
};

type DisplayItem = {
  "Question (Reddit post)": string;
  "Reddit response": string;
  "LLM response": string;
};

type QAPanelProps = {
  displayItems: DisplayItem[];
  carouselRef: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabledForwardButton: boolean;
  disabledBackButton: boolean;
  showQuizButton: boolean;
  startingText: ReactNode;
};
/**
 * This component is used to display the questions and responses in a carousel
 * @param {{
 *   displayItems: any[]; array for current items to display
 *   carouselRef: any; reference to the carousel
 *   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; function to open the modal
 *   disabledForwardButton: boolean; state to disable the forward button
 *   disabledBackButton: boolean; state to disable the back button
 *   showQuizButton: boolean; state to show the quiz button
 *   startingText: ReactNode; the starting text
 * }} props
 * @return {*}
 */
export default function QAPanel(props: QAPanelProps) {
  const {
    displayItems,
    carouselRef,
    setIsModalOpen,
    disabledForwardButton,
    disabledBackButton,
    showQuizButton,
    startingText,
  } = props;
  const { setPageNumber, incrementQuestionTime, pageNumber } = useAnalytics();
  const [currentTextRatio, changeTextRatio] = useState<number>(1);

  // used to get the font-size of the questions at the start
  const homeRef = useRef<HTMLParagraphElement>(null);
  const [defaultFontSize, changeDefaultFontSize] = useState<number>(-1);

  const day = new URL(window.location.toString()).searchParams.get("day");
  const version =
    new URL(window.location.toString()).searchParams.get("version") || 1;

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
    if (pageNumber === 0) {
      throw new Error(
        "Should not be able to go back when back button is disabled"
      );
    }

    // change the page number and move the carousel to the previous page
    setPageNumber(pageNumber - 1);
    carouselRef!.current.prev();
  };

  /**
   * This function is used to go forward to the next question
   */
  const goForward = () => {
    if (pageNumber === displayItems.length) {
      throw new Error(
        "Should not be able to go forward when button is disabled on the last page"
      );
    }

    // change the page number and move the carousel to the next page
    setPageNumber(pageNumber + 1);
    carouselRef!.current.next();
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
    <section className="d-flex flex-column justify-content-center pt-md-5 pt-xs-3 h-100">
      <Carousel
        dots={false}
        ref={carouselRef}
        adaptiveHeight={true}
        className={styles["QAPanel-Carousel"] + ""}
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
            {startingText}
          </p>
        </Card>
        {displayItems.map((data, index) => {
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
          <p
            className={`text-start ${styles["QAPanel-NonQuestion"]} h5 fw-normal`}
          >
            Thank you so much for participating and going through the content
            and the quiz. Your participation is greatly appreciated. <br />{" "}
            <br />
            <span className="fw-bold">
              Please click this link{" "}
              <a href={COMPLETIONLINKS[`day${day}Version${version}`]}>
                {COMPLETIONLINKS[`day${day}Version${version}`]}
              </a>{" "}
              to complete your session on Prolific.{" "}
            </span>
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
