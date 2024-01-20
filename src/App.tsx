import React from "react";
import QuestionBox from "./components/QuestionBox";
import SideNavigation from "./components/SideNavigation";
import styles from "./scss/App.module.scss";
import HelpNavigation from "./components/HelpNavigation";
function App() {
  //need to put attention check questions
  //on the left of questions put table of contents and on the right put hte SAMHSA phone and service and research
  return (
    <div className={`d-flex flex-column ${styles.app}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 d-flex justify-content-center p-2">
            <SideNavigation></SideNavigation>
          </div>
          <div className="col-8">
            <QuestionBox></QuestionBox>
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
