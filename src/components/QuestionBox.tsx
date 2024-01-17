import React from "react";
import styles from "../scss/QuestionBox.module.scss";
import { Card } from "antd";

export default function QuestionBox() {
  return (
    <Card className={styles.card}>
      <h1>Question #1</h1>
      <p>
        I have been having various discussions over on r/opiates and I have read
        that methadone clinics are decreasing and the trend is for suboxone to
        be used as an opiate replacement medicine. Is this the case in general?
        Same question has been posted in r/opiatesrecovery. I hope this is
        allowed!
      </p>
      <h2>Response</h2>
      <p>
        To be honest, I think suboxone is going to stop working for everyone
        because everyone is gonna be doing fentanyl and we all know the horrors
        of precipitated withdrawals.
      </p>
    </Card>
  );
}
