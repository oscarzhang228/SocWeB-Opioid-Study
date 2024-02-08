import React, { useEffect } from "react";
import QuestionNavigation from "./components/QuestionNavigation";
import styles from "./scss/App.module.scss";
import HelpNavigation from "./components/HelpNavigation";
import axios from "axios";
import QuestionView from "./components/QuestionView";

function App() {
  const [questions, setQuestions] = React.useState<any[]>([]);
  // stores the clicks for each question
  const [analytics_clicks, setAnalyticsClicks] = React.useState<any[]>([]);
  // stores the time for each question
  const [analytics_time, setAnalyticsTime] = React.useState<any[]>([]);

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const carouselRef = React.useRef<any>(null);

  useEffect(() => {
    axios("api/server").then((res) => {
      setQuestions(res.data);
    });
  }, []);
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
            ></QuestionNavigation>
          </div>
          <div className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
            <QuestionView
              carouselRef={carouselRef}
              questions={questions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
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
