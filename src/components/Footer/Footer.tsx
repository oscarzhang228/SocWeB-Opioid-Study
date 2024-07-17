import GTLogo from "../../images/GT_Logo.png";
import styles from "./Footer.module.scss";
import { Typography } from "antd";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import { LinkOutlined } from "@ant-design/icons";

const { Paragraph, Link } = Typography;

/**
 * This component is used to display the footer
 * @return {*}
 */
export default function Footer() {
  const { incrementHelplineClicks } = useAnalytics();
  return (
    <section className="d-flex justify-content-center p-md-4 pt-0 flex-column align-items-center">
      <section className={`${styles["Footer-Mobile"]} pt-3 text-center`}>
        <Paragraph className={styles["Mobile-Text"]}>
          SAMHSA Helpline: 1-800-662-HELP (4357)
        </Paragraph>
        <Paragraph className={styles["Mobile-Text"]}>
          Contact Us: smittal87@gatech.edu
        </Paragraph>
        <Paragraph className={styles["Mobile-Text"]}>
          <Link
            className={styles["Mobile-Link"]}
            target="_blank"
            href="https://findtreatment.gov/"
            onClick={() => incrementHelplineClicks()}
          >
            Find Treatments <LinkOutlined />
          </Link>
        </Paragraph>
      </section>

      <img
        src={GTLogo}
        className={`${styles["Footer-Logo"]} `}
        alt="Georgia Tech Logo"
      ></img>
      <section className="d-flex flex-column justify-content-center">
        <h1 className={`${styles["Footer-Heading"]} px-5 py-2 text-center`}>
          Social Dynamics and Well-Being Lab @ Georgia Tech
        </h1>
      </section>
    </section>
  );
}
