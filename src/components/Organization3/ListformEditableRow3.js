import React from 'react'

function ListformEditableRow3({editFormData,handleEditFormChange,handleCancel}) {
  return (
    <tr>
    <td>  
     <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Prd_loss"
      value={editFormData.Prd_loss} 
     className="form-control" placeholder="Prd_loss"required="text" 
    //  onChange={(e)=>setnewOid(e.target.value)}
     onChange={handleEditFormChange}
    />
                         </td>
                     <td>
 <button type="submit" 
//   onClick={updateList} 
  // class="save-btn"
  className="button submit" style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  >
    Save</button>
    <button type="cancel" 
//   onClick={updateList} 
  // class="save-btn"
  className="button cancel" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  onClick={handleCancel}
  >Cancel</button>
                 </td>
</tr>
  )
}

export default ListformEditableRow3