import { Button, ConfigProvider, theme, Tooltip } from "antd";
import "antd/dist/reset.css";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoutesConfig } from "./components/RoutesConfig";

const queryClient = new QueryClient();
const { defaultAlgorithm, darkAlgorithm } = theme;

const App = (): React.JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
          cssVar: true
        }}>
        <Router>
          <RoutesConfig />
        </Router>
        <Tooltip
          title="Переключить тему"
          placement="right"
          className="theme-button">
          <Button
            icon={isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => setIsDarkTheme(!isDarkTheme)}
          />
        </Tooltip>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
