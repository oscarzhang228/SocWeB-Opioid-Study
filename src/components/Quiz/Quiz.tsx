import { Modal, Button } from "antd";
import styles from "./Quiz.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAnalytics } from "../../analytics/AnalyticsProvider";

/**
 * This component is used to display the quiz modal
 * @param {{
 *   isModalOpen: boolean; state to open the modal
 *   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; function to change the state of the modal
 *   setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>; function to change the state of the quiz button
 *   carouselRef: any; reference to the carousel
 * }} props
 * @return {*}
 */
export default function Quiz(props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>;
  carouselRef: any;
}) {
  const { register, handleSubmit } = useForm<any>();
  const { sendAnalytics, changePageNumber } = useAnalytics();

  /**
   * Submit handler for the form.
   * @param data - form data
   */
  const onSubmit: SubmitHandler<any> = (data) => {
    // close the modal
    props.setIsModalOpen(false);

    // get rid of the quiz button
    props.setShowQuizButton(false);

    // go to next page
    props.carouselRef.current.next();
    changePageNumber("add");

    // handle the form data
    console.log(data);
    sendAnalytics(data);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  // Purpose: creates a question component
  const Question = (props: { question: string; questionNumber: number }) => {
    return (
      <>
        <h3 className={`${styles["Form-Body"]} text-center p-2 px-1`}>
          {props.question}
        </h3>
        <div className="d-flex justify-content-center gap-3">
          <input
            type="radio"
            id={`q${props.questionNumber}-yes`}
            value="true"
            required
            {...register(`q${props.questionNumber}`)}
          />
          <label htmlFor={`q${props.questionNumber}-yes`}>True</label>
          <input
            type="radio"
            id={`q${props.questionNumber}-no`}
            value="false"
            required
            {...register(`q${props.questionNumber}`)}
          />
          <label htmlFor={`q${props.questionNumber}-no`}>False</label>
        </div>
      </>
    );
  };
  const questionArr: string[] = [
    "Q1: Suboxone is a medication-assisted treatment for Opioid Use Disorder (OUD)",
    "Q2: It is easy for people to disclose their past addiction to opioids",
    "Q3: Going to methadone clinics is a one fit all solution to Opioid Use Disorder (OUD)",
    "Q4: It is difficult to get an appointment for methadone clinics or treatment using methadone.",
  ];

  const allQuestions = questionArr.map((question, index) => {
    return <Question key={index} question={question} questionNumber={index} />;
  });

  return (
    <Modal
      open={props.isModalOpen}
      onCancel={handleCancel}
      footer={[]}
      className={styles.Quiz}
    >
      <form
        className={`${styles["Form"]} d-flex flex-column gap-3 align-items-center p-3 px-1`}
        id="quiz"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className={`${styles["Form-Fields"]} d-flex flex-column gap-2 align-items-center`}
        >
          <h2 className={`${styles["Form-Title"]}`}>Quiz</h2>
          <h3 className={`${styles["Form-Body"]}`}>Enter Your Email</h3>
          <input
            type="email"
            placeholder="Email"
            className="text-center form-control"
            {...register("email")}
            required
          />
          {allQuestions}
        </fieldset>
        <Button htmlType="submit" key="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
}
