import React from 'react'

function ListAdmintable({Admin,handleEditclick,handleDelete}) {
  return (
    <tr>
    {/* <td>{Admin.Uid}</td> */}
    <td>{Admin.First_name}</td>
    <td>{Admin.Last_name}</td>
    <td>{Admin.Email}</td>
    {/* <td>{Admin.Oid}</td> */}
    <td>
      {/* <button  */}
 {/* //   onClick={()=>editUserList(Admin)} */}
 <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,Admin)}></i>
 
 {/* className="button edit"style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}} */}
 {/* >Edit</button>  */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,Admin)}></i>
 {/* <button 
 //  onClick={()=>deleteUserList(Admin)}
 className="button delete" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  >Delete</button> */}
  </td>
    </tr>
  )
}

export default ListAdmintable