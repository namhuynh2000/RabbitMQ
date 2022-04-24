import React, {useEffect, useState} from 'react'
import AddFilm from './AddFilm'
import Table from './Table'
import Header from './Header'
import api from '../api/films'

const Home = () => {
  const [films, setFilm] = useState([]);

  const retriveFilms = async ()=> // Lấy data kiểu api thông thường, k biết lấy = rabbit :(
  {
    const response =await api.get("/films");
    return response.data;
  };

  useEffect(()=>
  {
    const getAllFilms = async () =>{
      const allFilms = await retriveFilms();
      if (allFilms) setFilm(allFilms);
    }

    getAllFilms(); 
  },[]);

  return (
    <div class="mb-2 bg-body" style={{background:'LightGray'}}>

      <Header></Header>
      <div class="container">
      <h2 style={{textAlign: "center",marginTop:'50px'}}>Welcome to RabbitMQ</h2>
          <Table films={films}></Table>
          <AddFilm films={films} setFilm={setFilm}/>
      </div>
      
    </div>
  )
}

export default Home
