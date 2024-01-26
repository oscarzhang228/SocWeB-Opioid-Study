import {
  AppstoreOutlined,
  BarsOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "../scss/Navigation.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function SideNavigation(props: { questions: any[] }) {
  const items: MenuProps["items"] = [
    getItem(
      "Navigation",
      "nav",
      null,
      [
        getItem("Home", "home", <AppstoreOutlined />),
        getItem(
          "Questions",
          "questions",
          <BarsOutlined />,
          props.questions.map((data, index) => {
            return getItem(
              `Question ${index + 1}`,
              `question-${index + 1}`,
              <QuestionCircleOutlined />
            );
          })
        ),
      ],
      "group"
    ),
  ];
  return (
    <Menu
      className={`${styles["navigation-menu"]} pt-5`}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["questions"]}
      mode="inline"
      onClick={ScrollNavigation}
      items={items}
    />
  );
}

const ScrollNavigation = (event: { key: string }) => {
  document.getElementById(event.key)?.scrollIntoView();
};
