import React from "react";
import { MantineProvider, Button } from '@mantine/core';

export default function App() {
    return (
        <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
            <Button variant="gradient">Does something</Button>
        </MantineProvider>
    );
}
