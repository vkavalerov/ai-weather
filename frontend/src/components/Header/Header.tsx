import React from "react";
import { Header, Text, Box, MediaQuery, Burger } from "@mantine/core";

interface HeaderProps {
  opened: boolean;
  toggleOpened: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ opened, toggleOpened }) => {
  return (
    <Header
      height={{ base: 50, md: 55 }}
      p="md"
      style={{ backgroundColor: "orange", borderBottom: 0 }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 24,
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={toggleOpened}
            size="sm"
            color="white"
            mr="xl"
          />
        </MediaQuery>
        <Text color="white" italic>
          Weather-Ai!
        </Text>
      </Box>
    </Header>
  );
};

export default CustomHeader;
