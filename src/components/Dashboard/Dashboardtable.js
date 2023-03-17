import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Dashboardtable({dash,handleEditclick,handleDelete,handleAddFormChange,handleAddFormSubmit,Cancel}) {
  const [ShowForm, setShowForm] = useState(false);
  const ShowForms = () => {
    setShowForm(!ShowForm);
  };
  return (
    <>
      {/* <i className="fas fa-plus" onClick={ShowForms} /> */}
    {ShowForm && (
                      <>
                        <td>
                          <input
                            type="text"
                            name="Dname"
                            className="form-control"
                            placeholder="Dashboard Name"
                            required="text"
                            onChange={handleAddFormChange}
                          />
                        </td>

                        <td>
                        <i class="far fa-save fa-2x" onClick={handleAddFormSubmit} type="submit" style={{marginBottom: "5px",marginRight:"20px"}}></i>
                        <i class="far fa-window-close fa-2x" onClick={Cancel}></i>
                          {/* <button
                            type="submit"
                            onClick={handleAddFormSubmit}
                            className="button submit"
                            style={{
                              marginBottom: "5px",
                              marginRight: "3px",
                              backgroundColor: "#4CAF50",
                              border: "none",
                              color: "white",
                              padding: " 15px 32px",
                              textAlign: "center",
                              textDecoration: " none",
                              display: "inline-block",
                              fontSize: "18px",
                              padding: "4px 12px 4px 12px",
                              fontFamily: "'Roboto',sans-serif",
                              borderRadius: "8px",
                            }}
                          >
                            Submit
                          </button> */}
                          {/* <button
                            type="cancel"
                            className="button cancel"
                            style={{
                              backgroundColor: "#f44336",
                              border: "none",
                              color: "white",
                              padding: " 15px 32px",
                              textAlign: "center",
                              textDecoration: " none",
                              display: "inline-block",
                              fontSize: "18px",
                              padding: "4px 12px 4px 12px",
                              fontFamily: "'Roboto',sans-serif",
                              borderRadius: "8px",
                            }}
                            onClick={Cancel}
                          >
                            Cancel
                          </button> */}
                        </td>
                      </>
                    )}
    {/* <th></th> */}
    <tr key={dash.Did}>
    
          <Link  to=
               {`/department/${dash.Did}`} ><td><button type="button" className='button-16'>
               {dash.Dname}
          </button></td></Link>
                                           {/* </tr> */}
    <td>
    <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,dash)}></i>
      {/* <button 
      className='button edit' style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
onClick={(event)=>handleEditclick(event,dash)}
  >Edit</button>  */}
 <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,dash)}></i>
  
  {/* <button 
  className='button delete'style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
//   onClick={()=>deleteList(dash)}
  onClick={(event)=>handleDelete(event,dash)}
  >
    Delete</button> */}
  </td>
    
    </tr>
    </>
  )
}

export default Dashboardtable