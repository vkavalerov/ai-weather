import React from "react";
import { MantineProvider, Center } from '@mantine/core';

export default function App() {
    return (
        <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
            <Center maw={400} h={100} mx="auto">
                <Text>Welcome to Weather AI Website!</Text>
            </Center>
        </MantineProvider>
    );
}
