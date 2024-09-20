import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  helpMenuItems,
  helpMenuDefaultOpenKeys,
  debriefMenuItems,
  debriefMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";
import { useRef } from "react";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import QAPanel from "../components/QA Panel/QAPanel";
import { DEBRIEF_STATEMENTS } from "../data/debriefStatements";

/**
 * This component is used to display the debrief for misinformation
 * @returns debrief page
 */
export default function Debrief() {
  const carouselRef = useRef<any>(null);
  const { setPageNumber, pageNumber } = useAnalytics();
  const disabledBackButton = pageNumber === 0;
  const disabledForwardButton = pageNumber === DEBRIEF_STATEMENTS.length;
  const params = new URLSearchParams(window.location.search);

  const version = params.get("version");

  const STARTING_QA_Text = (
    <>
      Thank you for your participation in our study! Through this debrief
      statement, we want to inform you that in the study you read
      {version === "1" ? "human" : "LLM"}-generated responses to Opioid Use
      Disorder (OUD) queries{" "}
      {version === "1"
        ? ", which were taken from the online platform Reddit"
        : ""}
      . If you have any questions regarding this, please email
      smittal87@gatech.edu directly. It is entirely your decision if you wish
      your data to be kept or destroyed based on this provided information. If
      you no longer wish for your data to be used in the study, you will not
      lose any rights, services, or benefits as a result of your withdrawal. We
      will destroy all your data records if you choose to withdraw your
      participation. The study is entirely voluntary. <br /> <br />
      <span className="underline">Helplines and Contact Information: </span> If
      the participation in the study had a negative impact on you or made you
      feel distressed, please call the Substance Abuse and Mental Health
      Services Administration (SAMHSA) National Helpline at 1-800-662-HELP
      (4357). The Helpline is free and available 24/7 and can help you find
      local resources to help with any mental health or substance use concerns.{" "}
      <br /> <br />
      <span className="underline">
        Correction of Misinformation/Myths:
      </span>{" "}
      Also, as informed during the study, some of the content you read contained
      myths/misinformation on OUD. We want to debrief you on the factuality of
      the content, to correct the misinformation you were exposed to and to
      reduce any harm that was caused by this. <br /> <br />
      Please <strong>carefully read</strong> through the following
      misinformation and corrected information pairs. Please carefully read
      through all the content by clicking on the next arrow buttons.{" "}
      <strong>
        At the end of this reading, you will receive a link to complete your
        submission on Prolific.
      </strong>
    </>
  );

  /**
   * Navigation menu click handler that handles the click of the menu items and opens the corresponding page.
   * @param event the event that is triggered when a menu item is clicked
   * @throws error if an invalid menu item is clicked
   */
  const menuClickHandler = (event: { key: string }) => {
    switch (event.key) {
      case "treatments":
        window.open("https://findtreatment.gov/");
        break;
      case "home":
        // 0 is the home page number
        carouselRef.current.goTo(0);
        setPageNumber(0);
        break;
      case event.key.startsWith("Debrief:") ? event.key : "":
        // get the number after debrief
        const pageNumber = parseInt(event.key.split(":")[1]);
        carouselRef.current.goTo(pageNumber);
        setPageNumber(pageNumber);
        break;
      default:
        throw new Error("Invalid menu item clicked: " + event.key);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={debriefMenuItems}
            defaultOpenKeys={debriefMenuDefaultOpenKeys}
            clickHandler={menuClickHandler}
          />
        </section>
        <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
          <QAPanel
            startingText={STARTING_QA_Text}
            displayItems={DEBRIEF_STATEMENTS}
            carouselRef={carouselRef}
            setIsModalOpen={() => {}}
            disabledForwardButton={disabledForwardButton}
            disabledBackButton={disabledBackButton}
            showQuizButton={false}
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
