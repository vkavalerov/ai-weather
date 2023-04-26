import React from "react";
import { Button, Center, Group, MantineProvider, Text } from "@mantine/core";

const user = {
  name: "Ronnie Coleman",
  imageUrl:
    "https://hips.hearstapps.com/hmg-prod/images/mh-3-23-coleman-1648059910.png?crop=0.5xw:1xh;center,top&resize=1200:*",
  imageSize: 75,
};

export default function Profile() {
  return (
    <>
      <Group position="right">
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={"Photo of " + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize,
          }}
        />
      </Group>

      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily: "Georgia, serif",
          spacing: {
            xs: "1rem",
            sm: "1.2rem",
            md: "1.8rem",
            lg: "2.2rem",
            xl: "2.8rem",
          },
        }}
      >
        <Center maw={400} h={100} mx="auto">
          <Text>Hello, {user.name}! Welcome to Home Page!</Text>
        </Center>
      </MantineProvider>

      <MantineProvider theme={{ fontFamily: "Greycliff CF, sans-serif" }}>
        <Button variant="gradient">Does something</Button>
      </MantineProvider>
    </>
  );
}
