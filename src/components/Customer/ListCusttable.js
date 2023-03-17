import React from 'react'

function ListCusttable({Cust,handleEditclick,handleDelete}) {
  return (
    <tr>
    {/* <td>{Cust.Uid}</td> */}
    <td>{Cust.First_name}</td>
    <td>{Cust.Last_name}</td>
    <td>{Cust.Email}</td>
    {/* <td>{Cust.Oid}</td> */}
    <td>
    <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,Cust)}></i>
      {/* <button 
 //   onClick={()=>editUserList(Cust)}
 onClick={(event)=>handleEditclick(event,Cust)}
 className="button edit"style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
 >Edit</button>  */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,Cust)}></i>
 {/* <button 
 onClick={(event)=>handleDelete(event,Cust)}
 //  onClick={()=>deleteUserList(Cust)}
 className="button delete" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  >Delete</button> */}
  </td>
    </tr>
  )
}

export default ListCusttable