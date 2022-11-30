import * as React from "react";
import Box from "@mui/material/Box";

export default function BoxComponent() {
  return (
    <Box
      margin="auto"
      sx={{
        width: 500,
        height: 500,
        backgroundColor: "primary.dark",
      }}
    />
  );
}
