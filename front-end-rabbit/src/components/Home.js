import React, { useEffect, useState } from 'react'
import AddFilm from './AddFilm'
import Table from './Table'
import Header from './Header'
import socket from '../api/films'


const Home = () => {
  const [films, setFilm] = useState([]);

  /*const retriveFilms = async ()=> // Lấy data kiểu api thông thường, k biết lấy = rabbit :(
  {
    const response =await api.get("/films");
    return response.data;
  };*/
  function addData(data) {
    setFilm(
      [...films,
        data]
    )
  }

  function updateByID(data) {
    // const index = films.findIndex((data) => data.film_id = film.film_id);
    const entity = data.entity;
    const updateFilms = films.map(film => {
      if (film.film_id === data.film_id) {
        const newFilm = {
          ...film,
          ...entity
        }
        return newFilm;
      }
      else return film;
    })
    setFilm(updateFilms);
  }

  function deleteByID(id){
    const index = films.findIndex((data) => data.film_id === id);
    const updateFilms = films.splice(index,1);
    setFilm(updateFilms);
  }


  function fetchData() {
    socket.on("GET-res", data => {
      const dataSort = data.sort((a, b) => a.film_id - b.film_id)
      setFilm(data)
      // console.log(data)
    });
    socket.emit("GET");
  }

  useEffect(() => {
    fetchData();
    /*const getAllFilms = async () =>{
      const allFilms = await retriveFilms();
      if (allFilms) setFilm(allFilms);
    }

    getAllFilms(); */
  }, []);

  return (
    <div className="mb-2 bg-body" style={{ background: 'LightGray' }}>

      <Header></Header>
      <div className="container">
        <h2 style={{ textAlign: "center", marginTop: '50px' }}>Welcome to RabbitMQ</h2>
        <AddFilm handleUpdate={addData} films={films} setFilm={setFilm} />
        <Table updateByID={updateByID} deleteByID={deleteByID} films={films}></Table>
      </div>

    </div>
  )
}

export default Home
