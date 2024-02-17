import { Menu } from "antd";
import styles from "./NavigationMenu.module.scss";
export default function NavigationMenu(props: {
  menuItems: any[];
  clickHandler: (e: { key: string }) => void;
  defaultOpenKeys: string[];
}) {
  return (
    <Menu
      className={`${styles["Navigation"]} pt-5`}
      mode="inline"
      defaultOpenKeys={props.defaultOpenKeys}
      items={props.menuItems}
      onClick={props.clickHandler}
    />
  );
}
