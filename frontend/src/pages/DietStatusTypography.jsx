import React from "react";
import { Typography } from "@mui/material";

const colors = {
  complete: "#218838",
  done: "green",
  pending: "yellow",
  na: "#00000073",
};

const DietStatusTypography = ({ done }) => {
  return (
    <Typography
      variant="small"
      style={{
        color: "#fff",
        backgroundColor: colors[done?.replace("/", "")?.toLowerCase()],
      }}
      className="font-normal px-3 py-2 rounded text-center"
    >
      {done}
    </Typography>
  );
};

DietStatusTypography.defaultProps = {
  done: "N/A",
};

export default DietStatusTypography;
