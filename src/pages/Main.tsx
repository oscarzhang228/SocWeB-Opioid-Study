import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  questionMenuItems,
  questionMenuDefaultOpenKeys,
  helpMenuItems,
  helpMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import QAPanel from "../components/QA Panel/QAPanel";

// Main Page for the App with the menus and the content of the study
export default function Main() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionMenu, setQuestionMenu] = useState<any[]>(
    questionMenuItems([])
  );
  const {
    initializeQuestionAnalytics,
    incrementHelplineClicks,
    incrementDirectClicks,
    incrementHomePageClicks,
  } = useAnalytics();

  // get the questions -> initalize the panel, the menu, and the analytics
  useEffect(() => {
    axios("api/questions").then((res) => {
      setQuestions(res.data);
      setQuestionMenu(questionMenuItems(res.data));
      initializeQuestionAnalytics(res.data);
    });
  }, [initializeQuestionAnalytics]);

  const menuClickHandler = (event: { key: string }) => {
    switch (event.key) {
      case "treatments":
        window.open("https://findtreatment.gov/");
        incrementHelplineClicks();
        break;
      case "home":
        incrementHomePageClicks();
        break;
      case event.key.startsWith("Question:") ? event.key : "":
        // key in the formation Question:questionNumber so split it and get the question number
        const questionNumber = parseInt(event.key.split(":")[1]);
        // question 1 is at index 0
        incrementDirectClicks(questionNumber - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={questionMenu}
            defaultOpenKeys={questionMenuDefaultOpenKeys}
            clickHandler={menuClickHandler}
          />
        </section>
        <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
          <QAPanel questions={questions} />
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
