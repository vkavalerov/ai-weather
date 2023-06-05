import React from "react";
import { MantineProvider, Center, Text } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/Weather";
import AppShellDemo from "./pages/test_page";
export default function App() {
  return (
    <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
      <Routes>
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/demo" element={<AppShellDemo />} />
      </Routes>
    </MantineProvider>
  );
}
