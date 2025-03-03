import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import store from "src/shared/store";
import { Button, Card, Descriptions, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/shared/ROUTES";

export const Profile = observer((): React.JSX.Element => {
  const { isAuth, user, login, logout } = store;
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    login({ username, password });
  };
  const handleLogout = (): void => {
    logout();
    navigate(ROUTES.root);
  };

  if (isAuth) {
    return (
      <Flex
        vertical={true}
        gap={80}
        align="flex-start"
        justify="flex-start"
        style={{ width: "100%", height: "100%" }}>
        <Descriptions column={1} title="Информация о пользователе">
          <Descriptions.Item label="ФИО">{user?.fio}</Descriptions.Item>
          <Descriptions.Item label="Имя пользователя">
            {user?.username}
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
  } else {
    return (
      <Flex
        vertical={true}
        gap={20}
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}>
        <Card title="Необходимо авторизоваться">
          <Flex vertical={true} gap={20} align="center" justify="center">
            <Input
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}></Input>
            <Input
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Input>
            <Button
              type="primary"
              disabled={username.length === 0}
              onClick={handleLogin}>
              Войти
            </Button>
          </Flex>
        </Card>
      </Flex>
    );
  }
});
