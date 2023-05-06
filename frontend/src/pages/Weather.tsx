import {
  Button,
  TextInput,
  ActionIcon,
  Tooltip,
  Text,
  Stack,
  Center,
} from "@mantine/core";
import { useState } from "react";

const API_URL = "http://127.0.0.1:5000";

export default function WeatherPage(): JSX.Element {
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");

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
    <Center>
      <Stack spacing="lg">
        <TextInput
          placeholder="Enter a city name"
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
        >
          Get Weather
        </Button>
        <Text>{description}</Text>
      </Stack>
    </Center>
  );
}
