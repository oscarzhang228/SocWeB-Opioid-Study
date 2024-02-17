import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  questionMenuItems,
  questionMenuDefaultOpenKeys,
  helpMenuItems,
  helpMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";
import { useEffect, useState } from "react";
import axios from "axios";

// Main Page for the App with the menus and the content of the study
export default function Main() {
  // holds the questions for the day
  const [questions, setQuestions] = useState<string[]>([]);

  // start with an empty questions array but once I get it from the server, I will update the items to reflect that
  const [questionMenu, setQuestionMenu] = useState<any[]>(
    questionMenuItems([])
  );
  useEffect(() => {
    axios("api/questions").then((res) => {
      setQuestions(res.data);
      //     initializeAnalyticsArray(res.data.length);
      setQuestionMenu(questionMenuItems(res.data));
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={questionMenu}
            defaultOpenKeys={questionMenuDefaultOpenKeys}
            clickHandler={() => {}}
          />
        </section>
        <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100"></section>
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={helpMenuItems}
            defaultOpenKeys={helpMenuDefaultOpenKeys}
            clickHandler={() => {}}
          />
        </section>
      </div>
    </div>
  );
}

/*
Step-By-Step

Set up a grid element with a row and three columns.

Put the menu in the first and second column.

Handle click handlers for the menus and create the analytics handler for that
*/

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
