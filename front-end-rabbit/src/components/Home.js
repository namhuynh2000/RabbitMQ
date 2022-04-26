import React, { useEffect, useState } from "react";
import AddFilm from "./AddFilm";
import Table from "./Table";
import Header from "./Header";
import socket from "../api/films";

const Home = () => {
  const [films, setFilm] = useState([]);

  function addData(data) {
    setFilm([...films, data]);
  }

  function updateByID(data) {
    // const index = films.findIndex((data) => data.film_id = film.film_id);
    const entity = data.entity;

    console.log(films);
    const updateFilms = films.map((film) => {
      if (film.film_id === data.film_id) {
        const newFilm = {
          ...film,
          ...entity,
        };
        return newFilm;
      } else return film;
    });
    setFilm(updateFilms);
  }

  function deleteByID(id) {
    const copyArr = [...films];

    // console.log(copyArr);
    const index = copyArr.findIndex((data) => data.film_id === id);
    // console.log(index);
    // if (index === -1) return;
    // const updateFilms = copyArr.filter((film) => film.film_id !== id);
    copyArr.splice(index, 1);
    // console.log(copyArr);
    setFilm(copyArr);
  }

  // useEffect(() => {
  //   console.log(films);
  // }, [films]);

  useEffect(() => {
    socket.on("GET-res", (data) => {
      const dataSort = data.sort((a, b) => a.film_id - b.film_id);
      setFilm(dataSort);
    });

    //
    console.log("fetching...");

    socket.emit("GET");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="mb-2 bg-body" style={{ background: "LightGray" }}>
      <Header></Header>
      <div className="container">
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Welcome to RabbitMQ
        </h2>
        <AddFilm handleUpdate={addData} films={films} setFilm={setFilm} />
        <Table
          updateByID={updateByID}
          deleteByID={deleteByID}
          films={films}
        ></Table>
      </div>
    </div>
  );
};

export default Home;
