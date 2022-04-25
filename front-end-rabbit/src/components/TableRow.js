import React from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
export default function TableRow({
  film,
  handleSetEditFilmId,
  deleteByID,
  updateByID,
  handleEditClick,
  editFilmId,
}) {
  return editFilmId === film.film_id ? (
    <EditableRow
      film={film}
      updateByID={updateByID}
      handleSetEditFilmId={handleSetEditFilmId}
    ></EditableRow>
  ) : (
    <ReadOnlyRow
      film={film}
      handleEditClick={handleEditClick}
      deleteByID={deleteByID}
    ></ReadOnlyRow>
  );
}
