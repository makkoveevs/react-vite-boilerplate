import React from "react";

import { Flex, Layout } from "antd";
import { Breadcrumbs } from "./Breadcrumbs";
import "./Header.css";
import { ProfileDropnown } from "./ProfileDropdown";

export interface HeaderProps {
  themeSwitcher?: JSX.Element;
}

export const Header = ({ themeSwitcher }: HeaderProps): React.JSX.Element => {
  return (
    <Layout className="header">
      <Flex justify="space-between" align="center">
        <Breadcrumbs />
        <Flex gap={10} align="center" justify="flex-end">
          {themeSwitcher}
          <ProfileDropnown />
        </Flex>
      </Flex>
    </Layout>
  );
};
