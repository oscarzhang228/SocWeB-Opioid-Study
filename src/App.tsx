import React, { useEffect } from "react";
import QuestionBox from "./components/QuestionBox";
import SideNavigation from "./components/SideNavigation";
import styles from "./scss/App.module.scss";
import HelpNavigation from "./components/HelpNavigation";
import ClickStyle from "./components/ClickStyle";
import axios from "axios";

function App() {
  const [questions, setQuestions] = React.useState<any[]>([]);

  useEffect(() => {
    axios("http://localhost:3001/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);
  return (
    <div className={`d-flex flex-column ${styles.app}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 d-flex justify-content-center p-2">
            <SideNavigation questions={questions}></SideNavigation>
          </div>
          <div className="col-8 d-flex justify-content-center flex-column">
            <QuestionBox questions={questions}></QuestionBox>
            {/* <ClickStyle /> */}
          </div>
          <div className="col-2 d-flex justify-content-center p-2">
            <HelpNavigation></HelpNavigation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
