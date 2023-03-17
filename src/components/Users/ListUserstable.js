import React from 'react'

function ListUserstable({Users,handleEditclick,handleDelete}) {
  return (
    <tr>
                                           {/* <td>{Users.Uid}</td> */}
                                           <td>{Users.First_name}</td>
                                           <td>{Users.Last_name}</td>
                                           <td>{Users.Email}</td>
                                           {/* <td>{Users.Oid}</td> */}
                                           <td>
 <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,Users)}></i>
                                            
                                            {/* <button 
                                        //   onClick={()=>editUserList(Users)}
                                        onClick={(event)=>handleEditclick(event,Users)}
                                        className="button edit"style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                                        >Edit</button>  */}
                                        {/* <button 
                                        onClick={(event)=>handleDelete(event,Users)}
                                        //  onClick={()=>deleteUserList(Users)}
                                        className="button delete" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                                         >Delete</button> */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,Users)}></i>
                                         
                                         </td>
                                           </tr>
  )
}

export default ListUserstable