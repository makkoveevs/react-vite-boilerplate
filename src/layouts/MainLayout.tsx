import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Tooltip, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "src/components";
import { Header } from "src/components/Header";
import { ROUTES } from "src/shared/ROUTES";
import store from "src/shared/store";
const { defaultAlgorithm, darkAlgorithm } = theme;

export const MainLayout = observer((): React.JSX.Element => {
  const { isAuth } = store;
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.login);
    }
  }, [isAuth]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        cssVar: true
      }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header
            themeSwitcher={
              <Tooltip title="Переключить тему" placement="right">
                <Button
                  type="text"
                  icon={isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                />
              </Tooltip>
            }
          />
          <Content style={{ margin: "16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Footer</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
});
