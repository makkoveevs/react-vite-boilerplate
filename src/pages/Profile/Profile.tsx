import React from "react";

import { Button, Descriptions, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/shared/ROUTES";
import store from "src/shared/store";

export const Profile = observer((): React.JSX.Element => {
  const { user, logout } = store;
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate(ROUTES.root);
  };

  return (
    <Flex
      vertical={true}
      gap={80}
      align="flex-start"
      justify="flex-start"
      style={{ width: "100%", height: "100%" }}>
      <Descriptions column={1} title="Информация о пользователе">
        <Descriptions.Item label="ФИО">
          {user?.firstName} {user?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Имя пользователя">
          {user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="Администратор">
          {user?.isAdmin ? "Да" : "Нет"}
        </Descriptions.Item>
      </Descriptions>
      <Button type="default" onClick={handleLogout}>
        Выйти
      </Button>
    </Flex>
  );
});
