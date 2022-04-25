import React, { Fragment, useState } from "react";

import TableRow from "./TableRow";
const Table = ({ films, updateByID, deleteByID }) => {
  const [editFilmId, setEditFilmId] = useState(null);

  const handleEditClick = (
    event,
    film // Chức năng Edit
  ) => {
    event.preventDefault();
    setEditFilmId(film.film_id);
  };

  const handleSetEditFilmId = () => {
    setEditFilmId(null);
  };

  return (
    <div>
      <table className="table mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Tittle</th>
            <th>Language</th>
            <th>Year</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <TableRow
              key={film.film_id}
              film={film}
              editFilmId={editFilmId}
              handleSetEditFilmId={handleSetEditFilmId}
              updateByID={updateByID}
              deleteByID={deleteByID}
              handleEditClick={handleEditClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
