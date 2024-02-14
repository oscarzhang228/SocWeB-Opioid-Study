import {
  AppstoreOutlined,
  BarsOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./QuestionNavigation.module.scss";

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

export default function SideNavigation(props: {
  questions: any[];
  carouselRef: React.RefObject<any>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  analytics_clicks: any[];
  setAnalyticsClicks: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const navigateQuestion = (event: { key: string }) => {
    props.carouselRef.current.goTo(parseInt(event.key));
    props.setCurrentPage(parseInt(event.key));
    //Purpose: increments the direct clicks for the current page
    const newAnalyticsClicks = props.analytics_clicks;
    newAnalyticsClicks[parseInt(event.key)].directClicks++;
    props.setAnalyticsClicks(newAnalyticsClicks);
  };

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
              `${index + 1}`,
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
      className={`${styles["QuestionNavigation"]} pt-5`}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["questions"]}
      mode="inline"
      onClick={navigateQuestion}
      items={items}
    />
  );
}
