import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  questionMenuItems,
  questionMenuDefaultOpenKeys,
  helpMenuItems,
  helpMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";
import { useEffect, useRef, useState } from "react";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import QAPanel from "../components/QA Panel/QAPanel";
import axios from "axios";

import Quiz from "../components/Quiz/Quiz";

/**
 * This component is used to display the main page
 * @returns Main Page
 */
export default function Main() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carouselRef = useRef<any>(null);
  const {
    initializeQuestionAnalytics,
    incrementHelplineClicks,
    incrementDirectClicks,
    incrementHomePageClicks,
    setPageNumber,
    pageNumber,
  } = useAnalytics();
  const disabledBackButton = pageNumber === 0;
  const disabledForwardButton = pageNumber === questions.length;
  const showQuizButton = pageNumber === questions.length;
  const params = new URL(window.location.toString()).searchParams;
  const day = params.get("day");

  const questionMenu = questionMenuItems(questions, showQuizButton);

  /**
   * This useEffect is used to get the questions from the backend and set the questions, the question menu, and initialize the question analytics.
   * It also sets the showQuizButton state is it is the first time getting called.
   * @throws error if no questions are found for the day
   */
  useEffect(() => {
    // get the questions from the backend
    axios.get("api/questions?day=" + day).then((res) => {
      if (res.data.length === 0) {
        throw new Error("No questions found for day: " + day);
      }
      setQuestions(res.data);
      initializeQuestionAnalytics(res.data);
    });
  }, [initializeQuestionAnalytics, day]);

  /**
   * Navigation menu click handler that handles the click of the menu items and opens the corresponding page.
   * @param event the event that is triggered when a menu item is clicked
   * @throws error if an invalid menu item is clicked
   */
  const menuClickHandler = (event: { key: string }) => {
    switch (event.key) {
      case "treatments":
        window.open("https://findtreatment.gov/");
        incrementHelplineClicks();
        break;
      case "home":
        // 0 is the home page number
        carouselRef.current.goTo(0);
        setPageNumber(0);
        incrementHomePageClicks();
        break;
      case event.key.startsWith("Question:") ? event.key : "":
        handleQuestionMenuClick(event.key);
        break;
      case "quiz":
        setIsModalOpen(true);
        break;
      default:
        throw new Error("Invalid menu item clicked: " + event.key);
    }
  };

  /**
   * Handles the click of the question menu items and opens the corresponding question and increments all analytics relevant
   * @param key the key of the question menu item that was clicked
   * @throws error if an invalid question number is clicked
   */
  const handleQuestionMenuClick = (key: string) => {
    const questionNumber = parseInt(key.split(":")[1]);

    if (questionNumber < 0 || questionNumber > questions.length) {
      throw new Error("Invalid question number clicked: " + questionNumber);
    }

    // Go to the selected question
    carouselRef.current.goTo(questionNumber);
    setPageNumber(questionNumber);

    // Increment the direct clicks for the question
    incrementDirectClicks(questionNumber - 1);
  };

  return (
    <div className="container-fluid h-100">
      <Quiz
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        carouselRef={carouselRef}
      />
      <div className="row">
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={questionMenu}
            defaultOpenKeys={questionMenuDefaultOpenKeys}
            clickHandler={menuClickHandler}
          />
        </section>
        <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
          <QAPanel
            questions={questions}
            carouselRef={carouselRef}
            setIsModalOpen={setIsModalOpen}
            disabledForwardButton={disabledForwardButton}
            disabledBackButton={disabledBackButton}
            showQuizButton={showQuizButton}
          />
        </section>
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={helpMenuItems}
            defaultOpenKeys={helpMenuDefaultOpenKeys}
            clickHandler={menuClickHandler}
          />
        </section>
      </div>
    </div>
  );
}
