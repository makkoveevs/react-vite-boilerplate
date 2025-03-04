import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "src/components";
import { Header } from "src/components/Header";
import { ROUTES } from "src/shared/ROUTES";
import store from "src/shared/store";

export const MainLayout = observer((): React.JSX.Element => {
  const { isAuth } = store;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.login);
    }
  }, [isAuth]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
});
