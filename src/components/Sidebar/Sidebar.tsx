import React, { useState } from "react";

import {
  DesktopOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Flex, Menu, MenuProps, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/shared/ROUTES";
import store from "src/shared/store";

const { useToken } = theme;
const { Text } = Typography;

export interface SidebarProps {}

export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  visible: boolean,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem | null {
  if (!visible) {
    return null;
  }
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

export const Sidebar = observer(({}: SidebarProps): React.JSX.Element => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { isAuth, user } = store;
  const { token } = useToken();

  const handleClickMenuItem = (el: {
    key: string;
    keyPath: string[];
  }): void => {
    navigate(el.key);
  };

  const items: MenuItem[] = [
    getItem("Главная", ROUTES.root, true, <HomeOutlined />),
    getItem("Меню 1", ROUTES.app, isAuth, <DesktopOutlined />, [
      getItem("Подменю 1", ROUTES.app + "/1", isAuth),
      getItem("Подменю 2", ROUTES.app + "/2", isAuth),
      getItem("Подменю 3", ROUTES.app + "/3", isAuth)
    ]),
    getItem("Управление", ROUTES.admin, isAuth, <SettingOutlined />, [
      getItem("Пользователи", ROUTES.users, isAuth && (user?.isAdmin ?? false)),
      getItem("Настройки", ROUTES.params, isAuth)
    ]),
    // getItem("Профиль", ROUTES.profile, true, <UserOutlined />),
    getItem("Справка", ROUTES.help, true, <QuestionCircleOutlined />)
  ];

  return (
    <Sider
      theme={token.colorBgBase == "#000" ? "dark" : "light"}
      collapsible
      collapsed={collapsed}
      collapsedWidth={60}
      onCollapse={(value) => setCollapsed(value)}>
      <Flex
        align="center"
        justify="center"
        className="logo-vertical"
        onClick={() => navigate(ROUTES.root)}>
        <Text>LOGO</Text>
      </Flex>
      <Flex vertical={true} align="center" justify="flex-start" gap={40}>
        <Menu
          theme={token.colorBgBase == "#000" ? "dark" : "light"}
          style={{ width: collapsed ? "60px" : "100%" }}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          inlineIndent={30}
          items={items}
          onClick={handleClickMenuItem}
        />
      </Flex>
    </Sider>
  );
});
