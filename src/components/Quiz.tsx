import { Modal, Button } from "antd";
import styles from "../scss/Quiz.module.scss";

export default function Quiz(props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleOk = () => {
    console.log("ok");
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <Modal
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[<Button key="Submit" onClick={handleOk}></Button>]}
    >
      <form id={`${styles["msform"]}`}>
        <fieldset className="d-flex flex-column gap-2">
          <h2 className={`${styles["fs-title"]}`}>Quiz</h2>
          <h3 className={`${styles["fs-subtitle"]}`}>Enter Your Email</h3>
          <input type="text" name="email" placeholder="Email" />
        </fieldset>
      </form>
    </Modal>
  );
}
