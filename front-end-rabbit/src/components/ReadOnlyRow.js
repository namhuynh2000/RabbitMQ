import React from 'react'
import socket from '../api/films.js'

const ReadOnlyRow = ({ film, handleEditClick, deleteByID }) => {
  React.useEffect(() => {
    socket.on('DELETE-res', (msg) => {
      deleteByID(film.film_id);
    })
  }, [])

  function handleDelete() {
    const payload = {
      film_id: film.film_id
    }
    socket.emit("DELETE", payload)
  }

  return (
    <tr>
      <td>{film.film_id}</td>
      <td>{film.title}</td>
      <td>{film.language_id}</td>
      <td>{film.release_year}</td>
      <td>
        <button className='btn btn-success mr-3' onClick={(event) => handleEditClick(event, film)}>Edit</button>
        <button className='btn btn-danger' onClick={() => { handleDelete() }} style={{ margin: '10px' }} >Delete</button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow
