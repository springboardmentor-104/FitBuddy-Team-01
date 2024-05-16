import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function CreateGoalsDietActions({ onEdit, onDelete }) {
  const handleDeleteClick = () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      onDelete(); // Call onDelete if user confirms
    }
  };
  return (
    <div style={{ gap: 8, display: "flex" }}>
      <button onClick={onEdit} className="btn btn-sm btn-outline-primary">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        onClick={handleDeleteClick}
        className="btn btn-sm btn-outline-danger"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default CreateGoalsDietActions;
