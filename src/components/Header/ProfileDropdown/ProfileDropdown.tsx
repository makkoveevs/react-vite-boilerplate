import React from "react";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Image, MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import store from "src/shared/store";
import { TUser } from "src/shared/types";
import "./ProfileDropdown.css";

export interface ProfileDropnownProps {}

const createItems = (user: TUser | null): MenuProps["items"] => {
  return [
    {
      label: <b>{user?.firstName ?? "Пользователь"}</b>,
      key: "0"
    },
    {
      type: "divider"
    },
    {
      key: "1",
      label: <Link to="/profile">Профиль</Link>,
      icon: <UserOutlined />
    },
    {
      key: "2",
      label: (
        <Link to="/auth/logout" prefetch="none">
          Выход
        </Link>
      ),
      icon: <LogoutOutlined />
    }
  ];
};

export const ProfileDropnown = observer(
  ({}: ProfileDropnownProps): React.JSX.Element => {
    const { user } = store;

    return (
      <Dropdown
        menu={{ items: createItems(user) }}
        trigger={["click"]}
        className="dropdown">
        <a onClick={(e) => e.preventDefault()}>
          <Image
            src={`https://api.dicebear.com/9.x/glass/svg?seed=${user?.id}`}
            fallback="/images/fallback.png"
            preview={false}
            width={32}
            className="dropdown__avatar"
          />
        </a>
      </Dropdown>
    );
  }
);
