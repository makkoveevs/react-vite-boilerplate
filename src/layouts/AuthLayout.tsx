import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export const AuthLayout = (): React.JSX.Element => {
  return (
    <Layout>
      <Content>
        <Flex
          justify="center"
          align="start"
          style={{ minHeight: "100vh", paddingTop: "100px" }}>
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  );
};
