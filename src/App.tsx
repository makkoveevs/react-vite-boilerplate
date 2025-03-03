import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import { ConfigProvider, Layout, theme } from "antd";
import { Sidebar } from "./components";

import { RoutesConfig } from "./components/RoutesConfig";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Content, Footer } = Layout;

const App = (): React.JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <ConfigProvider
      theme={{ algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm }}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar
            isDarkTheme={isDarkTheme}
            onChangeTheme={(isDark: boolean): void => setIsDarkTheme(isDark)}
          />
          <Layout>
            <Content style={{ margin: "0 16px" }}>
              <Outlet />
              <RoutesConfig />
            </Content>
            <Footer style={{ textAlign: "center" }}>Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
