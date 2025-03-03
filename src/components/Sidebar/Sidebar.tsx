import React, { useState } from "react";

import {
  Typography,
  Flex,
  Menu,
  MenuProps,
  Button,
  Tooltip,
  Layout
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  UserOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined
} from "@ant-design/icons";
import { ROUTES } from "src/shared/ROUTES";
import { observer } from "mobx-react-lite";
import store from "src/shared/store";
const { Sider } = Layout;

const { Text } = Typography;

export interface SidebarProps {
  isDarkTheme: boolean;
  onChangeTheme: (isDark: boolean) => void;
}

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

export const Sidebar = observer(
  ({ isDarkTheme, onChangeTheme }: SidebarProps): React.JSX.Element => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { isAuth, user } = store;

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
        getItem(
          "Пользователи",
          ROUTES.users,
          isAuth && (user?.isAdmin ?? false)
        ),
        getItem("Настройки", ROUTES.params, isAuth)
      ]),
      getItem("Профиль", ROUTES.profile, true, <UserOutlined />),
      getItem("Справка", ROUTES.help, true, <QuestionCircleOutlined />)
    ];

    return (
      <Sider
        theme={isDarkTheme ? "dark" : "light"}
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
            theme={isDarkTheme ? "dark" : "light"}
            style={{ width: collapsed ? "60px" : "100%" }}
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            inlineIndent={30}
            items={items}
            onClick={handleClickMenuItem}
          />

          <Tooltip title="Переключить тему" placement="right">
            <Button
              icon={isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => onChangeTheme(!isDarkTheme)}
            />
          </Tooltip>
        </Flex>
      </Sider>
    );
  }
);
