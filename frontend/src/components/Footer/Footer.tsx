import React from "react";
import { Footer } from "@mantine/core";

const CustomFooter: React.FC = () => {
  return (
    <Footer
      height={40}
      p="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      GG VK YB ©
    </Footer>
  );
};

export default CustomFooter;
