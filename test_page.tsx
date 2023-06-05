import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Group,
  Drawer,
  ScrollArea,
  rem,
  Divider,
  UnstyledButton,
  Center,
  Box,
  Stack,
  TextInput,
  createStyles,
} from "@mantine/core";

const API_URL = "http://127.0.0.1:5000";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: "orange",
    borderBottom: 0,
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  loginButton: {
    marginLeft: "initial",
  },

  signUpButton: {
    marginLeft: theme.spacing.xs,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const { classes, cx } = useStyles();
  async function get_weather() {
    console.log("clicked");
    console.log(city);
    console.log(days);
    const resp_weather = await fetch(
      `${API_URL}/get_weather?location=${city}&days=${days}`
    );
    const data = await resp_weather.json();
    console.log(data);
    const resp_description = await fetch(
      `${API_URL}/describe_weather?weather_data=${JSON.stringify(data)}`
    );
    const description = await resp_description.json();
    console.log(description);
    setDescription(description);
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section>First section</Navbar.Section>
          <Navbar.Section>Second section</Navbar.Section>
          <Navbar.Section grow>Grow section</Navbar.Section>
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
      }
      footer={
        <Footer height={40} p="md" className={classes.footer}>
          GG VK YB ©
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 55 }} p="md" className={classes.header}>
          <div
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
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text color="white" italic>
              Weather-Ai!
            </Text>
          </div>
        </Header>
      }
    >
      <Center>
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
          <Button
            onClick={() => {
              console.log("clicked");
              console.log(city);
              get_weather();
            }}
            color="orange"
          >
            Get Weather
          </Button>
          <Text>{description}</Text>
        </Stack>
      </Center>
      <Text
        color="orange"
        style={{
          fontSize: 20,
        }}
      >
        Here is going to be weather data...
      </Text>
    </AppShell>
  );
}
