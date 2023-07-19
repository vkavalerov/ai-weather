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
    ActionIcon,
    Tooltip,
    Center,
    Box,
    Stack,
    TextInput,
    CopyButton,
    Textarea,
    createStyles,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
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

export default function WeatherPage() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [city, setCity] = useState("");
    const [days, setDays] = useState("");
    const [description, setDescription] = useState("");
    const [weatherData, setWeatherData] = useState<any>(null); // Define the weatherData state

    const { classes } = useStyles();

    async function getWeather() {
        const respWeather = await fetch(
            `${API_URL}/get_weather?location=${city}&days=${days}`
        );
        const weatherData = await respWeather.json();

        const respDescription = await fetch(
            `${API_URL}/describe_weather?weather_data=${JSON.stringify(weatherData)}`
        );
        const description = await respDescription.json();

        const formattedWeatherData = {
            date: weatherData.date,
            location: weatherData.location,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            sunrise: weatherData.sunrise,
            sunset: weatherData.sunset,
        };

        setWeatherData(formattedWeatherData);
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
                            <Button
                                onClick={() => {
                                    console.log("clicked");
                                    console.log(city);
                                    getWeather();
                                }}
                                color="orange"
                            >
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
            <Textarea
                p="sm"
                placeholder="Weather description"
                value={description}
                autosize
                rightSectionWidth={44} // Set the width of the right section
                rightSection={
                    <CopyButton value={description} timeout={2000}>
                        {({ copied, copy }) => (
                            <Tooltip
                                label={copied ? "Copied" : "Copy"}
                                withArrow
                                position="top"
                            >
                                <ActionIcon
                                    color={copied ? "teal" : "gray"}
                                    onClick={copy}
                                    style={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        cursor: "pointer",
                                    }}
                                >
                                    {copied ? (
                                        <IconCheck size="1rem" />
                                    ) : (
                                        <IconCopy size="1rem" />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                }
            />

            {weatherData && ( // Render weather data if available
                <Box ta="center">
                    <Text>Date: {weatherData.date}</Text>
                    <Text>Location: {weatherData.location}</Text>
                    <Text>Temperature: {weatherData.temperature}</Text>
                    <Text>Humidity: {weatherData.humidity}</Text>
                    <Text>Sunrise: {weatherData.sunrise}</Text>
                    <Text>Sunset: {weatherData.sunset}</Text>
                </Box>
            )}
        </AppShell>
    );
}
