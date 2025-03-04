import React from "react";

import { Flex, Layout } from "antd";
import { Breadcrumbs } from "./Breadcrumbs";
import "./Header.css";
import { ProfileDropnown } from "./ProfileDropdown";

export interface HeaderProps {}

export const Header = ({}: HeaderProps): React.JSX.Element => {
  return (
    <Layout className="header">
      <Flex justify="space-between" align="center">
        <Breadcrumbs />
        <ProfileDropnown />
      </Flex>
    </Layout>
  );
};
