import React from 'react'

const EditableRow = ({film, handleEditClick}) => {
  return (
    <tr>
                         
        <td></td>
        <td>
        <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter Tittle"></input>
        </td>
        <td>
        <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter Language"></input>
        </td>
        <td>
        <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter Year"></input>
        </td>
        <td>
            <button className='btn btn-success' onClick={(event)=> handleEditClick(event,film)}>Save</button>

        </td>
    </tr>
  )
}

export default EditableRow
