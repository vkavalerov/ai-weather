import React, { useState } from "react";
import {
    AppShell,
    Textarea,
    CopyButton,
    Tooltip,
    ActionIcon,
    Box,
    Text,
    } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import CustomNavbar from "../Navbar/Navbar";
import CustomHeader from "../Header/Header";
import CustomFooter from "../Footer/Footer";
import { weatherStyles } from "./WeatherStyles";

const API_URL = "http://127.0.0.1:5000";

const WeatherPage: React.FC = () => {
    const [opened, setOpened] = useState(false);
    const [city, setCity] = useState("");
    const [days, setDays] = useState("");
    const [description, setDescription] = useState("");
    const [weatherData, setWeatherData] = useState<any>(null);

    const toggleOpened = () => {
        setOpened((prevOpened) => !prevOpened);
    };

    const { classes } = weatherStyles();
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
            className={classes.appShell}
            navbar={
                <CustomNavbar
                    opened={opened}
                    toggleOpened={toggleOpened}
                    getWeather={getWeather}
                    setCity={setCity}
                    city={city}
                    setDays={setDays}
                    days={days}
                />
            }
            header={<CustomHeader opened={opened} toggleOpened={toggleOpened} />}
            footer={<CustomFooter />}
        >
            <Textarea
                p="sm"
                placeholder="Weather description"
                value={description}
                autosize
                rightSectionWidth={44}
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
                                    className={classes.actionIcon}
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

            {weatherData && (
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
};

export default WeatherPage;
