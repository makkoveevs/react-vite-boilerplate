import "antd/dist/reset.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoutesConfig } from "./components/RoutesConfig";

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RoutesConfig />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
