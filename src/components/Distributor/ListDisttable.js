import React from 'react'

function ListDisttable({Dist,handleEditclick,handleDelete}) {
  return (
    <tr>
                                           {/* <td>{Dist.Uid}</td> */}
                                           <td>{Dist.First_name}</td>
                                           <td>{Dist.Last_name}</td>
                                           <td>{Dist.Email}</td>
                                           {/* <td>{Dist.Oid}</td> */}
                                           <td>
 <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,Dist)}></i>
                                            
                                            {/* <button 
                                        //   onClick={()=>editUserList(Dist)}
                                        onClick={(event)=>handleEditclick(event,Dist)}
                                        className="button edit"style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                                        >Edit</button>  */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,Dist)}></i>
                                       
                                        {/* <button 
                                        onClick={(event)=>handleDelete(event,Dist)}
                                        //  onClick={()=>deleteUserList(Dist)}
                                        className="button delete" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                                         >Delete</button> */}
                                         </td>
                                           </tr>
  )
}

export default ListDisttable