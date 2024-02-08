import React, { useEffect } from "react";
import QuestionNavigation from "./components/QuestionNavigation";
import styles from "./scss/App.module.scss";
import HelpNavigation from "./components/HelpNavigation";
import axios from "axios";
import QuestionView from "./components/QuestionView";

function App() {
  const [questions, setQuestions] = React.useState<any[]>([]);
  // Purpose: stores the clicks for each question
  const [analytics_clicks, setAnalyticsClicks] = React.useState<any[]>([]);
  // Purpose: stores the time for each question
  const [analytics_time, setAnalyticsTime] = React.useState<any[]>([]);
  // Purpose: used for navigation and keeping track of what page for analytics
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const carouselRef = React.useRef<any>(null);

  // Purpose: fetches the questions from the server
  useEffect(() => {
    axios("api/server").then((res) => {
      setQuestions(res.data);
      InitializeAnalyticsArray(res.data.length);
    });
  }, []);

  const InitializeAnalyticsArray = (length: number) => {
    // Purpose: accounts for the introduction page
    length = length + 1;
    const newAnalyticsClicks = Array.from({ length }, () => {
      return { backClicks: 0, forwardClicks: 0, directClicks: 0 };
    });
    const newAnalyticsTime = Array.from({ length }, () => 0);
    setAnalyticsClicks(newAnalyticsClicks);
    setAnalyticsTime(newAnalyticsTime);
  };

  const SendAnalytics = () => {
    console.log(analytics_clicks);
    console.log(analytics_time);
  };
  return (
    <div className={`d-flex flex-column ${styles.app}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 d-none d-lg-flex justify-content-center p-2 side-navigation-div">
            <QuestionNavigation
              carouselRef={carouselRef}
              questions={questions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              analytics_clicks={analytics_clicks}
              setAnalyticsClicks={setAnalyticsClicks}
            ></QuestionNavigation>
          </div>
          <div className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
            <QuestionView
              carouselRef={carouselRef}
              questions={questions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              analytics_clicks={analytics_clicks}
              analytics_time={analytics_time}
              setAnalyticsClicks={setAnalyticsClicks}
              setAnalyticsTime={setAnalyticsTime}
              SendAnalytics={SendAnalytics}
            />
          </div>
          <div className={`col-2 d-none d-lg-flex justify-content-center p-2 `}>
            <HelpNavigation></HelpNavigation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
