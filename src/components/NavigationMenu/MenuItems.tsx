import type { MenuProps } from "antd";
import {
  PhoneOutlined,
  EllipsisOutlined,
  MailOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

/**
 * This function is used to create a menu item
 * @param {React.ReactNode} label the label of the menu item
 * @param {React.Key} key the key of the menu item
 * @param {React.ReactNode} [icon] the icon of the menu item
 * @param {MenuItem[]} [children] the children of the menu item
 * @param {"group"} [type] the type of the menu item
 * @return {*}  {MenuItem}
 */
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

export const helpMenuItems: any[] = [
  getItem(
    "Need Help?",
    "help",
    null,
    [
      getItem("Find Treatments", "treatments", <EllipsisOutlined />),
      getItem("Email Us", "email", <MailOutlined />, [
        getItem("smittal87@gatech.edu", "shravika", <LinkOutlined />),
      ]),
      getItem("SAMHSA Help Line", "helpline", <SafetyOutlined />, [
        getItem("1-800-662-HELP (4357)", "phone", <PhoneOutlined />),
      ]),
    ],
    "group"
  ),
];
// all items should be open by default
export const helpMenuDefaultOpenKeys = ["helpline", "email"];

/**
 * This function is used to create the question menu items
 * @param {string[]} questions the questions
 * @return {*}  {MenuItem[]}
 */
export const questionMenuItems = (questions: string[]) => {
  return [
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
          questions.map((data, index) => {
            return getItem(
              `Question ${index + 1}`,
              `Question:${index + 1}`,
              <QuestionCircleOutlined />
            );
          })
        ),
      ],
      "group"
    ),
  ];
};

// all items should be open by default
export const questionMenuDefaultOpenKeys = ["questions"];
