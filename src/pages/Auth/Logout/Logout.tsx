import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/shared/ROUTES";
import store from "src/shared/store";

export const Logout = (): React.JSX.Element => {
  const { isAuth, logout } = store;
  const navigate = useNavigate();

  useEffect(() => {
    async function doAction() {
      if (isAuth) await logout();
      navigate(ROUTES.login);
    }
    doAction();
  }, []);

  return (
    <Flex justify="center" align="center">
      <Spin />
    </Flex>
  );
};
