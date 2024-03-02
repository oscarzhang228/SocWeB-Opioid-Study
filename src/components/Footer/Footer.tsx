import GTLogo from "../../images/GT_Logo.png";
import styles from "./Footer.module.scss";

/**
 * This component is used to display the footer
 * @return {*}
 */
export default function Footer() {
  return (
    <div className="d-flex justify-content-center p-md-4 flex-column align-items-center">
      <img
        src={GTLogo}
        className={`${styles["Footer-Logo"]} pt-lg-5 pt-3`}
        alt="Georgia Tech Logo"
      ></img>
      <div className="d-flex flex-column justify-content-center">
        <h1 className={`${styles["Footer-Heading"]} px-5 py-2 text-center`}>
          Social Dynamics and Well-Being Lab @ Georgia Tech
        </h1>
      </div>
    </div>
  );
}
