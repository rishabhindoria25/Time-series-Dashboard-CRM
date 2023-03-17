import React from 'react'

function ListformEditableRow5({aj,editFormData,handlePrdChange,handleAdjChange,handleRejChange,handleEditFormChange,handleCancel}) {
// console.log("AJINDEX",(aj))
return (
  
  // {data.map((datum, index) => {
  //   <li key={datum.name}>
  //     <input type="text" name="name" value={datum.name} onChange={updateFieldChanged(index)}  />
  //   </li>
  // })}
<tr>
    <th>Reason for Rejection(Qty)</th>
    <td>{aj[1]}</td>
    <td>
    <input required type="number" 
   // ref={inputRef}
    defaultValue={aj[2]} 
   name={aj[2]} 
  //  id={}
//    name="RejQ"
   style={{backgroundColor:'#E8F0FE'}} 
  //  value={aj}
      className="form-control" placeholder="Qty"
      // onChange={handleRejChange}
      onChange={handleEditFormChange}
     />
     </td>
     <td>
     <button type="submit" 
  className="button submit" style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}>
    Save</button>
    <button type="cancel" 
  className="button cancel" style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
  onClick={handleCancel}
  >Cancel</button>
  </td>
    </tr>

)
}

export default ListformEditableRow5