import React from "react";
import { Typography } from "@mui/material";

const colors = {
  completed: "#218838",
  done: "green",
  pending: "#ffc107",
  na: "#00000073",
};

const DietStatusTypography = ({ done, onClick }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>

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
    </button>
  );
};

DietStatusTypography.defaultProps = {
  done: "N/A",
};

export default DietStatusTypography;
