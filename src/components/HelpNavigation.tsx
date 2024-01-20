import {
  PhoneOutlined,
  EllipsisOutlined,
  MailOutlined,
  LinkOutlined,
  InfoCircleOutlined,
  SafetyOutlined,
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
    "Need Help?",
    "helpNav",
    null,
    [
      getItem("Find Treatments", "treatments", <EllipsisOutlined />),
      getItem("Email Us", "email", <MailOutlined />, [
        getItem("smittal87@gatech.edu", "email", <LinkOutlined />),
      ]),
      getItem("SAMHSA Help Line", "samhsa", <SafetyOutlined />, [
        getItem("1-800-662-HELP (4357)", "phone", <PhoneOutlined />, [
          getItem("Free 24/7", "phone", <InfoCircleOutlined />),
        ]),
      ]),
    ],
    "group"
  ),
];

export default function HelpNavigation() {
  return (
    <Menu
      className={`${styles["navigation-menu"]} pt-5`}
      mode="inline"
      defaultOpenKeys={["samhsa", "email", "phone"]}
      items={items}
    />
  );
}
