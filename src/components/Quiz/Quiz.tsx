import { Modal, Button, Input } from "antd";
import styles from "./Quiz.module.scss";
import { useState } from "react";
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
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  // text for the quiz buttons that changes from next to submit
  const [buttonText, setButtonText] = useState<string>("Next");
  const handleOk = () => {
    console.log("ok");
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <Modal
      open={props.isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="Submit" htmlType="submit" onClick={handleSubmit(onSubmit)}>
          {buttonText}
        </Button>,
      ]}
    >
      <form className={`${styles["Quiz-Form"]}`}>
        <fieldset
          className={`${styles["Form-Fields"]} d-flex flex-column gap-2`}
        >
          <h2 className={`${styles["Form-Title"]}`}>Quiz</h2>
          <h3 className={`${styles["Form-Subtitle"]}`}>Enter Your Email</h3>
          <Input
            type="text"
            placeholder="Email"
            className="text-center"
            {...register("email", { required: true })}
          />
        </fieldset>
      </form>
    </Modal>
  );
}
