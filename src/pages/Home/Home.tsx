import React from "react";

import { Flex, Typography } from "antd";
const { Title, Text } = Typography;

export const Home = (): React.JSX.Element => {
  return (
    <Flex vertical={true} align="flex-start" justify="flex-start" gap={20}>
      <Title>Главная страница</Title>
      <Text>Главная главная</Text>
    </Flex>
  );
};
