import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import {
  questionMenuDefaultOpenKeys,
  helpMenuItems,
  helpMenuDefaultOpenKeys,
} from "../components/NavigationMenu/MenuItems";

import QAPanel from "../components/QA Panel/QAPanel";
import { useRef, useState } from "react";

/**
 * This component is used to display the main page
 * @returns Main Page
 */
export default function Debrief() {
  const [disabledBackButton, changeDisabledBackButton] =
    useState<boolean>(true);
  const [disabledForwardButton, changeDisabledForwardButton] =
    useState<boolean>(true);
  const [displayItems, setDisplayItems] = useState<any[]>([]);

  const carouselRef = useRef<any>(null);

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

        // disable the back button and enable the forward button if it is disabled
        changeDisabledBackButton(true);

        if (disabledForwardButton) {
          changeDisabledForwardButton(false);
        }
        break;
      case event.key.startsWith("Question:") ? event.key : "":
        handleQuestionMenuClick(event.key);
        break;
      default:
        throw new Error("Invalid menu item clicked: " + event.key);
    }
  };

  /**
   * Handles the click of the question menu items and opens the corresponding question and increments all analytics relevant
   * @param key the key of the question menu item that was clicked
   * @throws error if an invalid question number is clicked
   */
  const handleQuestionMenuClick = (key: string) => {
    const questionNumber = parseInt(key.split(":")[1]);

    if (questionNumber < 0 || questionNumber > displayItems.length) {
      throw new Error("Invalid question number clicked: " + questionNumber);
    }

    // Go to the selected question
    carouselRef.current.goTo(questionNumber);

    if (questionNumber === displayItems.length) {
      // Disable forward button and show quiz button if it's the last question
      changeDisabledForwardButton(true);
    } else {
      // Enable forward button and hide quiz button if it's not the last question
      changeDisabledForwardButton(false);
    }

    // Enable back button if it was disabled
    if (disabledBackButton) {
      changeDisabledBackButton(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <section className="col-2 d-none d-lg-flex justify-content-center p-2">
          <NavigationMenu
            menuItems={[]}
            defaultOpenKeys={questionMenuDefaultOpenKeys}
            clickHandler={menuClickHandler}
          />
        </section>
        <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-column h-100">
          <QAPanel
            questions={displayItems}
            setIsModalOpen={() => {}}
            carouselRef={carouselRef}
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
