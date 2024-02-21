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

// Main Page for the App with the menus and the content of the study
export default function Main() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionMenu, setQuestionMenu] = useState<any[]>(
    questionMenuItems([])
  );
  const carouselRef = useRef<any>(null);
  const {
    initializeQuestionAnalytics,
    incrementHelplineClicks,
    incrementDirectClicks,
    incrementHomePageClicks,
    changePageNumber,
  } = useAnalytics();

  const { day } = useParams();

  // get the questions -> initalize the panel, the menu, and the analytics
  useEffect(() => {
    axios.get("api/questions?day=" + day).then((res) => {
      setQuestions(res.data);
      setQuestionMenu(questionMenuItems(res.data));
      initializeQuestionAnalytics(res.data);
    });
  }, [initializeQuestionAnalytics, day]);

  const menuClickHandler = (event: { key: string }) => {
    switch (event.key) {
      case "treatments":
        window.open("https://findtreatment.gov/");
        incrementHelplineClicks();
        break;
      case "home":
        changePageNumber("set", 0);
        incrementHomePageClicks();
        carouselRef.current.goTo(0);
        break;
      case event.key.startsWith("Question:") ? event.key : "":
        // key in the formation Question:questionNumber so split it and get the question number
        const questionNumber = parseInt(event.key.split(":")[1]);

        // increment the direct clicks for the question which is one behind the question number because the question number starts from 1
        incrementDirectClicks(questionNumber - 1);

        // go to the question
        carouselRef.current.goTo(questionNumber);
        changePageNumber("set", questionNumber);
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
          <QAPanel questions={questions} carouselRef={carouselRef} />
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
