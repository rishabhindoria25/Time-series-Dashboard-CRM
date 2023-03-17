import React from 'react'

function listformtable2({article,handleEditclick,handleDelete}) {
  return (
    <tr>
    <td>{article[1]}</td>
    <td>
 <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,article)}></i>

      {/* <button 
      className='button edit' style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
   // onClick={()=>editList(article)}
//    onClick={ editForms }
onClick={(event)=>handleEditclick(event,article)}
  >Edit</button>  */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,article)}></i>

  {/* <button 
  className='button delete'style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
//   onClick={()=>deleteList(article)}
  onClick={(event)=>handleDelete(event,article)}
  >
    Delete</button> */}
  </td>
    </tr>
  )
}

export default listformtable2