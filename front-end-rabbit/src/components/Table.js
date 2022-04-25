import React, { Fragment, useState } from 'react'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'

const Table = ({ films, updateByID, deleteByID }) => {
    const [editFilmId, setEditFilmId] = useState(null);

    const handleEditClick = (event, film) => // Chức năng Edit
    {
        event.preventDefault();
        setEditFilmId(film.film_id);
    }

    const handleSetEditFilmId = () => {
        setEditFilmId(null);
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
                        {films.map((film) => (
                            <Fragment key={film.film_id}>
                                {editFilmId === film.film_id ? <EditableRow film={film} updateByID={updateByID} handleSetEditFilmId={handleSetEditFilmId}></EditableRow> : <ReadOnlyRow film={film} handleEditClick={handleEditClick} deleteByID={deleteByID}></ReadOnlyRow>}
                            </Fragment>

                        ))}

                    </tbody>
                </table>
            </form>

        </div>
    )
}

export default Table
