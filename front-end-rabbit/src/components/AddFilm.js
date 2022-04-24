import React from 'react'


const AddFilm = ({films,setFilm}) => {
 


    const handleAddFormSubmit= async()=> // chức năng thêm mới
    {

    }

  return (
    <div >
        <form class="d-grid gap-1 col-8 mx-auto mt-5">
            <h5>Add New Film</h5>
        <div class="input-group mb-3">
        <input type="text" class="form-control" name='tittle' placeholder="Tittle" aria-label="Tittle" ></input>
        <input type="text" class="form-control" name='language' placeholder="Language" aria-label="Server" ></input>
        <input type="text" class="form-control" name='year' placeholder="Year" aria-label="Server" ></input>
        <input type="text" class="form-control" name='email' placeholder="Email" aria-label="Server" ></input>
        <button class="btn btn-primary btn-default" style={{witdh:'100%'}}  onClick={handleAddFormSubmit}>AddFilm</button>
        </div>
        </form>

        
    </div>
  )
}

export default AddFilm
