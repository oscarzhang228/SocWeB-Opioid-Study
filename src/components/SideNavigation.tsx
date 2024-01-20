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

const items: MenuProps["items"] = [
  getItem(
    "Navigation",
    "nav",
    null,
    [
      getItem("Home", "home", <AppstoreOutlined />),
      getItem("Questions", "questions", <BarsOutlined />, [
        getItem("Question 1", "q1", <QuestionCircleOutlined />),
        getItem("Question 2", "q2", <QuestionCircleOutlined />),
        getItem("Question 3", "q3", <QuestionCircleOutlined />),
        getItem("Question 4", "q4", <QuestionCircleOutlined />),
        getItem("Question 5", "q5", <QuestionCircleOutlined />),
        getItem("Question 6", "q6", <QuestionCircleOutlined />),
        getItem("Question 7", "q7", <QuestionCircleOutlined />),
        getItem("Question 8", "q8", <QuestionCircleOutlined />),
      ]),
    ],
    "group"
  ),
];

export default function SideNavigation() {
  return (
    <Menu
      className={`${styles["navigation-menu"]} pt-5`}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["questions"]}
      mode="inline"
      items={items}
    />
  );
}
