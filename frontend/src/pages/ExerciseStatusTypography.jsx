import React from "react";
import { Typography } from "@mui/material";

const colors = {
  complete: "#218838",
  done: "#218838",
  pending: "#ffc107",
  na: "#00000073",
};

const ExerciseStatusTypography = ({ done }) => {
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

ExerciseStatusTypography.defaultProps = {
  done: "N/A",
};

export default ExerciseStatusTypography;
