import React from "react";
import {
  Center,
  Group,
  Navbar,
  Stack,
  TextInput,
  Button,
  createStyles, // временный имопрт
} from "@mantine/core";
interface NavbarProps {
  opened: boolean;
  toggleOpened: () => void;
  getWeather: () => Promise<void>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setDays: React.Dispatch<React.SetStateAction<string>>;
  days: string;
}

//временная константа
const useStyles = createStyles((theme) => ({
  loginButton: {
    marginLeft: "initial",
  },
  signUpButton: {
    marginLeft: theme.spacing.xs,
  },
}));

const CustomNavbar: React.FC<NavbarProps> = ({
  opened,
  getWeather,
  setCity,
  city,
  setDays,
  days,
}) => {
  //временная константа
  const { classes } = useStyles();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Center p="md">
        <Stack spacing="lg">
          <TextInput
            placeholder="Search location"
            onChange={(event) => {
              console.log(event.currentTarget.value);
              setCity(event.currentTarget.value);
            }}
            value={city}
          />
          <TextInput
            placeholder="Enter days count (1-5)"
            onChange={(event) => {
              console.log(event.currentTarget.value);
              setDays(event.currentTarget.value);
            }}
            value={days}
          />
          <Button onClick={getWeather} color="orange">
            Get Weather
          </Button>
        </Stack>
      </Center>
      <Navbar.Section grow> </Navbar.Section>
      <Navbar.Section>
        <Group
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="default" className={classes.loginButton}>
            Log in
          </Button>
          <Button className={classes.signUpButton} color="orange">
            Sign up
          </Button>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
