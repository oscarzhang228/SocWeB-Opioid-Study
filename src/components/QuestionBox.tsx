import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card } from "antd";
import Question from "./Question";

export default function QuestionBox() {
  return (
    <div className={`d-flex flex-column ${styles["card-container"]} p-3`}>
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
      <p>Thank you so much for participating and going through the document!</p>
    </div>
  );
}
