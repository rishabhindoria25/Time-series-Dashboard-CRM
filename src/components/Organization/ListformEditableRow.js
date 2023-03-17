import React from 'react'

function ListformEditableRow({editFormData,handleEditFormChange,handleCancel}) {
  return (
    <tr>
    {/* <td>  
     <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Oid"
      value={editFormData.Oid} 
     className="form-control" placeholder="Oid"required="number" 
    //  onChange={(e)=>setnewOid(e.target.value)}
    // onChange={handleEditFormChange}
    />
                         </td> */}
                         <td>
      <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Oname"
       value={editFormData.Oname} 
       className="form-control" placeholder="Oname"required="text" 
    //    onChange={(e)=>setnewOname(e.target.value)}
    onChange={handleEditFormChange}
       />
                       </td>
 <td>
  <input style={{backgroundColor:'#E8F0FE'}}  type="text" name="Address"  
  value={editFormData.Address} 
  className="form-control" placeholder="Address"required="text" 
//   onChange={(e)=>setnewAddress(e.target.value)}
onChange={handleEditFormChange}
  />
 </td>
 <td>
  <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Child"  
//   value={editFormData.Address} 
  className="form-control" placeholder="Child"required="text" 
//   onChange={(e)=>setnewAddress(e.target.value)}
onChange={handleEditFormChange}
  />
 </td>
  <td>
   <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Contact"  
   value={editFormData.Contact} 
   className="form-control" placeholder="Contact"required="text" 
//    onChange={(e)=>setnewContact(e.target.value)}
onChange={handleEditFormChange}
   />
     </td>
                     <td>
                     <i class="far fa-save fa-2x"  type="submit" style={{marginBottom: "5px",marginRight:"20px"}}></i>
 {/* <button type="submit" 
//   onClick={updateList} 
  // class="save-btn"
  className="button submit" style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  >
    Save</button> */}
    <i class="far fa-window-close fa-2x" onClick={handleCancel}></i>
    {/* <button type="cancel" 
//   onClick={updateList} 
  // class="save-btn"
  className="button cancel" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  onClick={handleCancel}
  >Cancel</button> */}
                 </td>
</tr>
  )
}

export default ListformEditableRow