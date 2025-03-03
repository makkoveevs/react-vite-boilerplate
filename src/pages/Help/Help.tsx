import React from "react";

import { Flex, Typography } from "antd";
const { Title, Text } = Typography;

export const Help = (): React.JSX.Element => {
  return (
    <Flex vertical={true} align="flex-start" justify="flex-start" gap={20}>
      <Title>Справка по работе с системой</Title>
      <Text>
        Система интуитивно понятна и не требует дополнительных справочных
        материалов
      </Text>
    </Flex>
  );
};
