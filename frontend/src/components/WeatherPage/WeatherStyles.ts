import { createStyles } from "@mantine/core";

export const weatherStyles = createStyles((theme) => ({
  appShell: {
    main: {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.orange[0],
    },
  },
  actionIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
  },
}));
