import { Menu } from "antd";
import styles from "./NavigationMenu.module.scss";

type NavigationMenuProps = {
  menuItems: any[];
  clickHandler: (e: { key: string }) => void;
  defaultOpenKeys: string[];
};
/**
 * This component is used to display a menu based on the menu items.
 * @param {{
 *   menuItems: any[]; menu items
 *   clickHandler: (e: { key: string }) => void; function to handle the click of the menu items
 *   defaultOpenKeys: string[]; default open keys
 * }} props
 * @return {*}
 */
export default function NavigationMenu(props: NavigationMenuProps) {
  const { defaultOpenKeys, clickHandler, menuItems } = props;

  return (
    <Menu
      className={`${styles["Navigation"]} pt-5`}
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      items={menuItems}
      onClick={clickHandler}
    />
  );
}
