import { createStyles } from "@mantine/core";

export const headerStyles = createStyles((theme) => ({
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.yellow,
    borderBottom: 0,
  },
  box: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  burger: {
    margin: theme.spacing.xs,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontStyle: "italic",
  },
}));
