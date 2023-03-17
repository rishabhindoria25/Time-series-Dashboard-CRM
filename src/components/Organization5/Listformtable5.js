import React from 'react'

function listformtable5({aj,handleEditclick,handleDelete}) {
  
  return (
<tr>
    <th>Reason for Rejection</th>
    <td>{aj[1]}</td>
    <td>{aj[2]}</td>
    <td><i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,aj)}></i></td>
    </tr>
  )
}

export default listformtable5