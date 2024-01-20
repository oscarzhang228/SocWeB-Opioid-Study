import React from "react";
import QuestionBox from "./components/QuestionBox";
import SideNavigation from "./components/SideNavigation";
import styles from "./scss/App.module.scss";
function App() {
  //need to put attention check questions
  //on the left of questions put table of contents and on the right put hte SAMHSA phone and service and research
  return (
    <div className={`d-flex flex-column ${styles.app}`}>
      <p>
        Thank you for consenting to participate in our study! Following are some
        questions and their corresponding response, related to Opioid Use
        Disorder. Please read through them carefully. You may search the meaning
        of any unknown terms that appear throughout the document. As a reminder,
        your participation is entirely voluntary, and you may discontinue
        participation at any time. After going through the following content,
        you will be asked to answer a few questions to help us gauge your
        overall understanding.
      </p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 d-flex justify-content-center p-2">
            <SideNavigation></SideNavigation>
          </div>
          <div className="col-8">
            <QuestionBox></QuestionBox>
          </div>
        </div>
      </div>

      <p>Thank you so much for participating and going through the document!</p>
      <footer>
        If reading through the document brings you distress, please call the
        Substance Abuse and Mental Health Services Administration (SAMHSA)
        National Helpline at 1-800-662-HELP (4357). The Helpline is free and
        available 24/7 and can help you find local resources to help with any
        mental health or substance use concerns. You can also find an online
        listing of treatment programs in your area through the SAMHSA Treatment
        Services Locator. If you have any questions, please feel free to reach
        out to our research team at smittal87@gatech.edu.
      </footer>
    </div>
  );
}

export default App;
