import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card } from "antd";
import Question from "./Question";

export default function QuestionBox() {
  return (
    <div className={`d-flex flex-column ${styles["card-container"]}`}>
      <Card className={`${styles.card} p-5 w-100`}>
        <Question
          questionNumber={1}
          question="I have been having various discussions over on r/opiates and I have read
          that methadone clinics are decreasing and the trend is for suboxone to
          be used as an opiate replacement medicine. Is this the case in general?
          Same question has been posted in r/opiatesrecovery. I hope this is
          allowed!?"
          response="To be honest, I think suboxone is going to stop working for everyone
          because everyone is gonna be doing fentanyl and we all know the horrors
          of precipitated withdrawals."
        />
      </Card>
      <Card className={`${styles.card} p-5 w-100`}>
        <Question
          questionNumber={1}
          question="I have been having various discussions over on r/opiates and I have read
        that methadone clinics are decreasing and the trend is for suboxone to
        be used as an opiate replacement medicine. Is this the case in general?
        Same question has been posted in r/opiatesrecovery. I hope this is
        allowed!?"
          response="To be honest, I think suboxone is going to stop working for everyone
        because everyone is gonna be doing fentanyl and we all know the horrors
        of precipitated withdrawals."
        />
      </Card>
      <Card className={`${styles.card} p-5 w-100`}>
        <Question
          questionNumber={1}
          question="I have been having various discussions over on r/opiates and I have read
        that methadone clinics are decreasing and the trend is for suboxone to
        be used as an opiate replacement medicine. Is this the case in general?
        Same question has been posted in r/opiatesrecovery. I hope this is
        allowed!?"
          response="To be honest, I think suboxone is going to stop working for everyone
        because everyone is gonna be doing fentanyl and we all know the horrors
        of precipitated withdrawals."
        />
      </Card>
      <Card className={`${styles.card} p-5 w-100`}>
        <Question
          questionNumber={1}
          question="I have been having various discussions over on r/opiates and I have read
        that methadone clinics are decreasing and the trend is for suboxone to
        be used as an opiate replacement medicine. Is this the case in general?
        Same question has been posted in r/opiatesrecovery. I hope this is
        allowed!?"
          response="To be honest, I think suboxone is going to stop working for everyone
        because everyone is gonna be doing fentanyl and we all know the horrors
        of precipitated withdrawals."
        />
      </Card>
    </div>
  );
}
