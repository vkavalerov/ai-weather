import React from "react";
import { Header, Text, Box, MediaQuery, Burger } from "@mantine/core";
import { headerStyles } from "./HeaderStyles";

interface HeaderProps {
  opened: boolean;
  toggleOpened: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ opened, toggleOpened }) => {
  const { classes } = headerStyles();

  return (
    <Header height={{ base: 50, md: 55 }} className={classes.header}>
      <Box className={classes.box}>
        <MediaQuery largerThan="sm" styles={{}}>
          <Burger
            opened={opened}
            onClick={toggleOpened}
            className={classes.burger}
            size="md"
            color="white"
          />
        </MediaQuery>
        <Text className={classes.text}>Weather-Ai!</Text>
      </Box>
    </Header>
  );
};

export default CustomHeader;
