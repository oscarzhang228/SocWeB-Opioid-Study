import { Modal, Button } from "antd";
import styles from "./Quiz.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAnalytics } from "../../analytics/AnalyticsProvider";
import quizQuestions from "./quizQuestions";
import { QuizData, QuizFormInputs } from "../../pages/quizTypes";

type QuizProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuizButton: React.Dispatch<React.SetStateAction<boolean>>;
  carouselRef: any;
};
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
export default function Quiz(props: QuizProps) {
  const { register, handleSubmit } = useForm<QuizFormInputs>();
  const { sendAnalytics, changePageNumber } = useAnalytics();

  const { setIsModalOpen, setShowQuizButton, isModalOpen, carouselRef } = props;

  /**
   * Submit handler for the form.
   * @param data - form data
   */
  const onSubmit: SubmitHandler<QuizFormInputs> = (data) => {
    const quizData: QuizData = {};
    // loop through every property of data and if any are null then return
    for (let key of Object.keys(data)) {
      // if its a question then add it to the quizData object
      if (key.startsWith("q")) {
        const questionNumber = parseInt(key.slice(1));
        const question = quizQuestions[parseInt(day!) - 1][questionNumber];

        quizData[key as any] = {
          question: question,
          answer: data[key as any],
        };
      }
    }
    // if its the prolificId then add it to the quizData object
    quizData["prolificId"] = data["prolificId"];

    // close the modal
    setIsModalOpen(false);

    // get rid of the quiz button
    setShowQuizButton(false);

    // go to next page
    carouselRef.current.next();
    changePageNumber("add");

    // handle the form data
    sendAnalytics(quizData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Purpose: creates a question component
  const Question = (props: { question: string; questionNumber: number }) => {
    return (
      <>
        <h3 className={`${styles["Form-Body"]} text-center p-2 px-1`}>
          {props.question}
        </h3>

        <input
          type="textarea"
          {...register(`q${props.questionNumber}`)}
          required
          className="text-center form-control px-2"
        />
      </>
    );
  };

  //get the questions by day
  const params = new URL(window.location.toString()).searchParams;
  const day = params.get("day");
  if (parseInt(day!) > 15 || parseInt(day!) < 1) {
    throw new Error("Invalid day");
  }
  const questionArr: string[] = quizQuestions[parseInt(day!) - 1];

  const allQuestions = questionArr.map((question, index) => {
    return <Question key={index} question={question} questionNumber={index} />;
  });

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
      className={styles.Quiz}
    >
      <form
        className={`${styles["Form"]} d-flex flex-column gap-3 align-items-center p-2 px-1`}
        id="quiz"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className={`${styles["Form-Fields"]} d-flex flex-column gap-2 align-items-center`}
        >
          <h2 className={`${styles["Form-Title"]}`}>Quiz</h2>
          <h3 className={`${styles["Form-Body"]}`}>Enter Your Prolific ID</h3>
          <input
            type="text"
            placeholder="Prolific ID"
            className="text-center form-control px-2"
            {...register("prolificId")}
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
