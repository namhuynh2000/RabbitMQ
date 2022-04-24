import React, { Fragment, useState } from 'react'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'

const Table = ({films}) => {
    const [editFilmId, setEditFilmId]= useState(null);

    const handleEditClick = (event,film)=> // Chức năng Edit
    {
        event.preventDefault();
        setEditFilmId(film.id);
    }


    const handleDeleteClick = (event,film)=> // Chức năng xóa
    {
        event.preventDefault();
        setEditFilmId(film.id);
    }


  return (
    <div>
        <form>
        <table class="table mt-3">
            <thead class="table-light">
               <tr>
                   <th>ID</th>
                   <th>Tittle</th>
                   <th>Language</th>
                   <th>Year</th>
                   <th>Option</th>
               </tr>
            </thead>
            <tbody>
                {films.map((film)=>(  
                    <Fragment>
                        {editFilmId===film.id ? <EditableRow></EditableRow> : <ReadOnlyRow film={film} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}></ReadOnlyRow>}

                    </Fragment>

                    ))}
                
            </tbody>
            </table>
            </form>
      
    </div>
  )
}

export default Table
