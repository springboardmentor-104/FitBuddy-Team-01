import React from "react";
import { Typography } from "@mui/material";

const colors = {
  completed: "#218838",
  done: "#218838",
  pending: "#ffc107",
  na: "#00000073",
};

const ExerciseStatusTypography = ({ done, onClick }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
      <Typography
        variant="body2"
        style={{
          color: "#fff",
          backgroundColor: colors[done?.replace("/", "")?.toLowerCase()],
        }}
        className="font-normal px-3 py-2 rounded text-center"
      >
        {done}
      </Typography>
    </button>
  );
};

ExerciseStatusTypography.defaultProps = {
  done: "N/A",
};

export default ExerciseStatusTypography;
