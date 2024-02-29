import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  questionMenuItems,
  questionMenuDefaultOpenKeys,
  helpMenuItems,
  helpMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import QAPanel from "../components/QA Panel/QAPanel";
import { useParams } from "react-router-dom";
import Quiz from "../components/Quiz/Quiz";

/**
 * This component is used to display the main page
 * @returns Main Page
 */
export default function Main() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionMenu, setQuestionMenu] = useState<any[]>(
    questionMenuItems([])
  );
  const [showQuizButton, setShowQuizButton] = useState<boolean>(false);
  const carouselRef = useRef<any>(null);
  const {
    initializeQuestionAnalytics,
    incrementHelplineClicks,
    incrementDirectClicks,
    incrementHomePageClicks,
    changePageNumber,
  } = useAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { day } = useParams();

  /**
   * This useEffect is used to get the questions from the backend and set the questions, the question menu, and initialize the question analytics
   */
  useEffect(() => {
    const parsedDay = day?.slice(3);
    axios.get("api/questions?day=" + parsedDay).then((res) => {
      setQuestions(res.data);
      setQuestionMenu(questionMenuItems(res.data));
      initializeQuestionAnalytics(res.data);
    });
  }, [initializeQuestionAnalytics, day]);

  const [disabledBackButton, changeDisabledBackButton] =
    useState<boolean>(true);
  const [disabledForwardButton, changeDisabledForwardButton] =
    useState<boolean>(false);

  /**
   * Navigation menu click handler that handles the click of the menu items and opens the corresponding page.
   * @param event the event that is triggered when a menu item is clicked
   */
  const menuClickHandler = (event: { key: string }) => {
    switch (event.key) {
      case "treatments":
        window.open("https://findtreatment.gov/");
        incrementHelplineClicks();
        break;
      case "home":
        // go to the home page and set the page number to 0 which is the home page
        carouselRef.current.goTo(0);
        changePageNumber("set", 0);

        // disable the back button and enable the forward button if it is disabled
        changeDisabledBackButton(true);
        if (disabledForwardButton) {
          changeDisabledForwardButton(false);
        }

        // if the quiz button is showing then hide it
        if (showQuizButton) {
          setShowQuizButton(false);
        }
        incrementHomePageClicks();
        break;
      case event.key.startsWith("Question:") ? event.key : "":
        // key in the formation Question:questionNumber so split it and get the question number
        const questionNumber = parseInt(event.key.split(":")[1]);

        // go to the question
        carouselRef.current.goTo(questionNumber);
        changePageNumber("set", questionNumber);
        // increment the direct clicks for the question which is one behind the question number because the question number starts from 1
        incrementDirectClicks(questionNumber - 1);

        // if question is the last question the set disabled forward and show the quiz button else get rid of both
        if (questionNumber === questions.length) {
          changeDisabledForwardButton(true);
          setShowQuizButton(true);
        } else if (disabledForwardButton) {
          changeDisabledForwardButton(false);
        }
        if (showQuizButton && questionNumber !== questions.length) {
          setShowQuizButton(false);
        }
        // if back button is disabled then enable it
        if (disabledBackButton) {
          changeDisabledBackButton(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid h-100">
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
            changeDisabledForwardButton={changeDisabledForwardButton}
            disabledBackButton={disabledBackButton}
            changeDisabledBackButton={changeDisabledBackButton}
            showQuizButton={showQuizButton}
            setShowQuizButton={setShowQuizButton}
          />
          <Quiz
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            carouselRef={carouselRef}
            setShowQuizButton={setShowQuizButton}
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

// const navigateQuestion = (event: { key: string }) => {
//   if (event.key === "home") {
//     props.carouselRef.current.goTo(0);
//     props.setCurrentPage(0);
//     return;
//   }
//   props.carouselRef.current.goTo(parseInt(event.key));
//   props.setCurrentPage(parseInt(event.key));
//   //Purpose: increments the direct clicks for the current page
//   const newAnalyticsClicks = props.analytics_clicks;
//   newAnalyticsClicks[parseInt(event.key)].directClicks++;
//   props.setAnalyticsClicks(newAnalyticsClicks);
// };
//const HandleClick = (e: { key: string }) => {
//   if (e.key === "treatments") {
//     props.setAnalyticsHelplineClicks(props.analytics_helpline_clicks + 1);
//     window.open("https://findtreatment.gov/");
//   } else if (e.key === "email") {
//     window.open("mailto:smittal87@gatech.edu");
//   }
// };
