import React from "react";
import { MantineProvider, Center, Text } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/Weather";

export default function App() {
  return (
    <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
      <Routes>
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </MantineProvider>
  );
}
