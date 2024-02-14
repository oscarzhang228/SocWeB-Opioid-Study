import { Modal, Button, Radio } from "antd";
import styles from "./Quiz.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  q1: boolean;
  q2: boolean;
  q3: boolean;
  q4: boolean;
};

export default function Quiz(props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendAnalytics: (email: string) => void;
}) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.sendAnalytics(data.email);
    props.setIsModalOpen(false);
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const questionArr: string[] = [
    "Q1: Suboxone is a medication-assisted treatment for Opioid Use Disorder (OUD)",
    "Q2: It is easy for people to disclose their past addiction to opioids",
    "Q3: Going to methadone clinics is a one fit all solution to Opioid Use Disorder (OUD)",
    "Q4: It is difficult to get an appointment for methadone clinics or treatment using methadone.",
  ];

  const allQuestions = questionArr.map((question, index) => {
    return <Question key={index} question={question} />;
  });

  return (
    <Modal
      open={props.isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button htmlType="submit" key="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>,
      ]}
    >
      <form className={`${styles["Quiz-Form"]}`}>
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
      </form>
    </Modal>
  );
}

const Question = (props: { question: string }) => {
  return (
    <>
      <h3 className={`${styles["Form-Body"]} text-center p-3`}>
        {props.question}
      </h3>
      <Radio.Group className="d-flex justify-content-center">
        <Radio value={1}>True</Radio>
        <Radio value={2}>False</Radio>
      </Radio.Group>
    </>
  );
};
