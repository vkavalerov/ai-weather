import { createStyles } from "@mantine/core";

export const navbarStyles = createStyles((theme) => ({
  group: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  getWeatherButton: {
    background: theme.colors.yellow,
  },
  loginButton: {
    marginLeft: theme.spacing.xs,
  },
  signUpButton: {
    marginLeft: theme.spacing.xs,
    background: theme.colors.yellow,
  },
}));
