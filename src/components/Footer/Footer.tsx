import GTLogo from "../../images/GT_Logo.png";
import styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <div className="d-flex justify-content-center p-3">
      <img
        src={GTLogo}
        className={styles["Footer-Logo"]}
        alt="Georgia Tech Logo"
      ></img>
      <div className="d-flex flex-column justify-content-center">
        <h1 className={styles["Footer-Heading"]}>
          Social Dynamics and Wellbeing Lab @ Georgia Tech
        </h1>
        <h2 className={styles["Footer-Subheading"]}>
          If reading through the document brings you distress,
        </h2>
        <p className={styles["Footer-Content"]}>
          Call the Substance Abuse and Mental Health Services Administration
          (SAMHSA) National Helpline at 1-800-662-HELP. (4357) <br /> Contact
          Shravika Mittal at smittal87@gatech.edu. <br /> Find Treatment
          Programs through the
          <strong>
            <a
              className={styles["Footer-Link"]}
              href="https://findtreatment.gov/"
            >
              SAMHSA Treatment Services Locator.
            </a>
          </strong>
        </p>
      </div>
    </div>
  );
}
