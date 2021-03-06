import React, { useState } from "react";
import socket from "../api/films.js";

const ReadOnlyRow = ({ film, handleEditClick, deleteByID }) => {
  const [flag, setFlag] = useState(false);

  React.useEffect(() => {
    socket.on("DELETE-res", (msg) => {
      if (msg === film.film_id) deleteByID(msg);
    });
  }, [flag]);

  function handleDelete(e) {
    e.preventDefault();
    const payload = {
      film_id: film.film_id,
    };
    socket.emit("DELETE", payload);
    setFlag(true);
    console.log("delete");
  }

  return (
    <tr style={{verticalAlign: "middle"}}>
      <td>{film.film_id}</td>
      <td>{film.title}</td>
      <td>{film.language_id}</td>
      <td>{film.release_year}</td>
      <td>
        <button
          className="btn btn-success mr-3"
          onClick={(event) => handleEditClick(event, film)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            handleDelete(e, film);
          }}
          style={{ margin: "10px" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
