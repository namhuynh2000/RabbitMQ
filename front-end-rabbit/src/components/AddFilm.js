import React from "react";
import socket from "../api/films.js";

const AddFilm = ({ films, setFilm, handleUpdate }) => {
  const [dataForm, setDataForm] = React.useState({});

  React.useEffect(() => {
    socket.on("POST-res", (msg) => {
      const id = msg[0];

      const newData = { ...dataForm, film_id: id };
      handleUpdate(newData);
    });
  }, [dataForm]);

  const handleAddFormSubmit = (
    e // chức năng thêm mới
  ) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const language = document.querySelector("#language").value;
    const year = document.querySelector("#year").value;
    // const email = document.querySelector('#email').value;
    const dataForm = {
      entity: {
        title: title,
        language_id: language,
        release_year: year,
      },
    };
    setDataForm(dataForm.entity);
    socket.emit("POST", dataForm);
  };

  return (
    <div>
      <form className="d-grid gap-1 col-8 mx-auto mt-5">
        <h5>Add New Film</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            aria-label="Title"
          ></input>
          <input
            type="text"
            className="form-control"
            id="language"
            placeholder="Language"
            aria-label="Server"
          ></input>
          <input
            type="text"
            className="form-control"
            id="year"
            placeholder="Year"
            aria-label="Server"
          ></input>
          {/* <input type="text" className="form-control" id='description' placeholder="Description" aria-label="Server" ></input> */}
          <button
            className="btn btn-primary btn-default"
            style={{ witdh: "100%" }}
            onClick={(e) => handleAddFormSubmit(e)}
          >
            AddFilm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFilm;
