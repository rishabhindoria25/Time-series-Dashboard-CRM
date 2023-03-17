import React from 'react'

function MachineEditableRow({editFormData,handleEditFormChange,handleCancel}) {
  console.log(editFormData)
  return (
    <tr>
    <td>  
     <input style={{backgroundColor:'#E8F0FE'}} type="text" name="Adj_loss"
      value={editFormData.Adj_loss} 
     className="form-control" placeholder="Machine name"required="text" 
    //  onChange={(e)=>setnewOid(e.target.value)}
     onChange={handleEditFormChange}
    />
                         </td>
                     <td>
                     <i class="far fa-save fa-2x"  type="submit" style={{marginBottom: "5px",marginRight:"20px"}}></i>
                     <i class="far fa-window-close fa-2x" onClick={handleCancel}></i>
 {/* <button type="submit" 
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
  >Cancel</button> */}
                 </td>
</tr>
  )
}

export default MachineEditableRow