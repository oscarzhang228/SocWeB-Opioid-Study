import GTLogo from "../../images/GT_Logo.png";
import styles from "./Footer.module.scss";

/**
 * This component is used to display the footer
 * @return {*}
 */
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
          Social Dynamics and Well-Being Lab @ Georgia Tech
        </h1>
      </div>
    </div>
  );
}
