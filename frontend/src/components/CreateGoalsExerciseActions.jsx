// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// function CreateGoalsExerciseActions({ onEdit, onDelete }) {
//   const handleDeleteClick = () => {
//     // Show confirmation dialog
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item?"
//     );
//     if (confirmDelete) {
//       alert()
//     }
//   };
//   return (
//     <div style={{ gap: 8, display: "flex" }}>
//       <button
//         onClick={handleDeleteClick}
//         className="btn btn-sm btn-outline-danger"
//       >
//         <FontAwesomeIcon icon={faTrash} />
//       </button>
//     </div>
//   );
// }

// export default CreateGoalsExerciseActions;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CreateGoalsExerciseActions({ onDelete }) {
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      onDelete();
    }
  };

  return (
    <div style={{ gap: 8, display: "flex" }}>
      <button onClick={handleDeleteClick} className="btn btn-sm btn-outline-danger">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default CreateGoalsExerciseActions;
