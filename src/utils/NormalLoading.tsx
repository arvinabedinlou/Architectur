import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const NormalLoading = () => {
  return (
    <Box sx={{ justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};
export default NormalLoading;
