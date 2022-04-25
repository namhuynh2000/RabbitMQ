import React from 'react'
import socket from '../api/films.js'

const EditableRow = ({ film, handleSetEditFilmId, updateByID }) => {
  const [dataForm, setDataForm] = React.useState({});
  const Ref = React.useRef(null);
  

  React.useEffect(() => {
    socket.on('UPDATE-res', (msg) => {
      // alert(msg);
      handleSetEditFilmId();
      updateByID(dataForm)
    })
  }, [dataForm])

  function handleSaveClick(event) {
    event.preventDefault();
    const title = Ref.current.querySelector('#title').value ? Ref.current.querySelector('#title').value : film.title;
    const language = Ref.current.querySelector('#language').value ? Ref.current.querySelector('#language').value : film.language_id;
    const year = Ref.current.querySelector('#year').value ? Ref.current.querySelector('#year').value : film.release_year;
    const dataForm = {
      film_id: film.film_id,
      entity: {
        title: title,
        language_id: language,
        release_year: year
      }
    }
    console.log(dataForm);
    setDataForm(dataForm);
    socket.emit("UPDATE", dataForm);
  }

  return (
    <tr ref={Ref}>
      <td></td>
      <td>
        <input type="text" class="form-control" id='title' aria-describedby="emailHelp" placeholder="Enter Tittle"></input>
      </td>
      <td>
        <input type="text" class="form-control" id='language' aria-describedby="emailHelp" placeholder="Enter Language"></input>
      </td>
      <td>
        <input type="text" class="form-control" id='year' aria-describedby="emailHelp" placeholder="Enter Year"></input>
      </td>
      <td>
        <button className='btn btn-success' onClick={(event) => handleSaveClick(event)}>Save</button>
      </td>
    </tr>
  )
}

export default EditableRow
