import React from "react";
import { Typography } from "@mui/material";

const DietStatusTypography = ({ done }) => {
  const statusColor = done ? "green" : "yellow";
  const textColor = done ? "black" : "white";
  const backgroundColor = done ? "#218838" : "#ffc107";
  const padding = done ? "7px" : "7px";
  const borderRadius = done ? "3px" : "3px";

  return (
    <Typography
      variant="small"
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        padding: padding,
        borderRadius: borderRadius,
      }}
      className="font-normal"
      align="center"
    >
      {done ? "Done" : "Pending"}
    </Typography>
  );
};

export default DietStatusTypography;
