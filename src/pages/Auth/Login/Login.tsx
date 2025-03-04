import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Flex, Input, Spin, message } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/shared/ROUTES";
import { IS_AUTH_IN_PROGRESS_KEY } from "src/shared/constants";
import store from "src/shared/store";
import "./Login.css";

export const Login = observer((): React.JSX.Element => {
  const { isAuth, login } = store;
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: async (e: any) => {
      e.preventDefault();
      localStorage.setItem(IS_AUTH_IN_PROGRESS_KEY, "true");

      try {
        await login({ email, password });
        message.success("Добро пожаловать!");
        navigate(ROUTES.root);
      } catch {
        message.error("Неправильный логин и/или пароль");
      }
      localStorage.removeItem(IS_AUTH_IN_PROGRESS_KEY);
    }
  });
  const handleForgetPassword = () => {
    message.info("Очень, очень жаль...");
  };
  const canDoLogin = useMemo(
    () => email.length > 0 && password.length > 0 && !isPending,
    [email, password, isPending]
  );

  useEffect(() => {
    if (isAuth) navigate(ROUTES.root);
  }, []);

  return (
    <Flex
      className="container-login"
      vertical={true}
      gap={10}
      align="center"
      justify="center"
      style={{ width: "100%", height: "100%" }}>
      <Card>
        <div style={{ textAlign: "center" }}>
          <KeyOutlined className="container-login__icon" />
          <h1 className="container-login__title">Добро пожаловать</h1>
          <p>
            Пожалуйста, войдите в систему для доступа к <br />
            ...
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <Flex
            className="form-container"
            vertical={true}
            gap={10}
            align="center"
            justify="center">
            <Input
              prefix={<UserOutlined />}
              placeholder="Имя пользователя (email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Input
              prefix={<KeyOutlined />}
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              disabled={!canDoLogin}
              style={{ width: "100%" }}
              htmlType="submit">
              {isPending ? <Spin /> : "Войти"}
            </Button>
          </Flex>
        </form>
      </Card>
      <a href="#" onClick={handleForgetPassword}>
        Забыли пароль?
      </a>
    </Flex>
  );
});
