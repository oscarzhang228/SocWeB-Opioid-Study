import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "../scss/SideNavigation.module.scss";

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
    [getItem("Home", "13", <AppstoreOutlined />)],
    "group"
  ),

  getItem("Questions", "questions", <BarsOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
  ]),
];

export default function SideNavigation() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      className={`${styles["navigation-menu"]}`}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["questions"]}
      mode="inline"
      items={items}
    />
  );
}
