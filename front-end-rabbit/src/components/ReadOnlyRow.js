import React from 'react'

const ReadOnlyRow = ({film, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
                         
        <td>{film.id}</td>
        <td>{film.address}</td>
        <td>{film.phoneNumber}</td>
        <td>{film.email}</td>
        <td>
            <button className='btn btn-success mr-3' onClick={(event)=> handleEditClick(event,film)}>Edit</button>
            <button className='btn btn-danger' onClick={handleDeleteClick} style={{margin:'10px'}} >Delete</button>
        </td>
    </tr>
  )
}

export default ReadOnlyRow
