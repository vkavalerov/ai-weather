import React from "react";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import WeatherPage from "./components/WeatherPage/Weather";

export default function App() {
  return (
    <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
      </Routes>
    </MantineProvider>
  );
}
