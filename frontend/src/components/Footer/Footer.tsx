import React from "react";
import { Footer } from "@mantine/core";
import { footerStyles } from "./FooterStyles";

const CustomFooter: React.FC = () => {
  const { classes } = footerStyles();

  return (
    <Footer height={40} className={classes.footer}>
      GG VK YB ©
    </Footer>
  );
};

export default CustomFooter;
