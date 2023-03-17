import React from 'react'

function ListformEditableRow52({aj,editFormData,handlePrdChange,handleAdjChange,handleRejChange,handleEditFormChange,handleCancel}) {
//   const VAAR=[];
//    const handleRejChange=(event)=>{
//     event.preventDefault();
//     // const fieldName=event.target.getAttribute('name');
//       const fieldValue=event.target.value;
//        VAAR.push(event.target.value)
//       // const newEditFormData={...editFormData};
//       // newEditFormData[fieldName]=fieldValue;
      
//       // seteditFormData(newEditFormData);
//       // console.log("new",newEditFormData)
//       console.log("new",fieldValue)
  
//     }
//     const handleAdjChange=(event)=>{
//       event.preventDefault();
//       // const fieldName=event.target.getAttribute('name');
//         const fieldValue=event.target.value;
//        VAAR.push(event.target.value)
         
//         // const newEditFormData={...editFormData};
//         // newEditFormData[fieldName]=fieldValue;
        
//         // seteditFormData(newEditFormData);
//         // console.log("new",newEditFormData)
//         console.log("new",fieldValue)
    
//       }
//       const handlePrdChange=(event)=>{
//         event.preventDefault();
//         // const fieldName=event.target.getAttribute('name');
//           const fieldValue=event.target.value;
//        VAAR.push(event.target.value)
           
//           // const newEditFormData={...editFormData};
//           // newEditFormData[fieldName]=fieldValue;
          
//           // seteditFormData(newEditFormData);
//           // console.log("new",newEditFormData)
//           console.log("new",fieldValue)
      
//         }
//         console.log("VAAR",VAAR)
return (
<tr>
    <th>Setup & Adjustment loss(Min)</th>
    <td>{aj[1]}</td>
    <td>
    <input required type="number" 
   // ref={inputRef}
    defaultValue={aj[2]} 
   name={aj[2]} 
  //  id={}
//    name="RejQ"
   style={{backgroundColor:'#E8F0FE'}} 
  //  value={aj[2]}
      className="form-control" placeholder="Min"
      // onChange={handleRejChange}
      onChange={handleEditFormChange}

      // onChange={(event)=>handleEditFormChange(event,aj[2])}
     //  onChange={newValue => addTagCall(newValue, rej[2])}
      // onChange={(e)=>{handleRejChange([e.target.value])}}
     // onChange={(event) => setAmount(event.target.value)}
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
  >Cancel</button></td>
  </tr>

//    {/* <>
// {rej && rej[0].map(aj=>( */}


// //  {/* <i class="far fa-edit fa-2x" onClick={(event)=>handleEditclick(event,rej)}></i> */}

// //       {/* <button 
// //       className='button edit' style={{marginBottom: "5px",marginRight:"3px",backgroundColor: "#008CBA",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 24px 4px 24px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
// //    // onClick={()=>editList(article)}
// // //    onClick={ editForms }
// // onClick={(event)=>handleEditclick(event,article)}
// //   >Edit</button>  */}
// //  {/* <i class="far fa-trash-alt fa-2x" style={{paddingLeft:'10px'}}onClick={(event)=>handleDelete(event,rej)}></i> */}

// //   {/* <button 
// //   className='button delete'style={{backgroundColor: "#f44336",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
// // //   onClick={()=>deleteList(article)}
// //   onClick={(event)=>handleDelete(event,article)}
// //   >
// //     Delete</button> */}
// //   {/* </td> */}
// //     // </tr>
// //     ))}
// // {rej && rej[1].map((aj,index)=>(
// //    <tr>
// //     <th>Setup & Adjustment loss</th>
// //     <td>{aj[1]}</td>
// //     <input required type="text" 
// //    // ref={inputRef}
// //    //  defaultValue="null" 
// //     // name="AdjQ"
// //     name={aj[2]}
// //    style={{backgroundColor:'#E8F0FE'}} 
// //    value={index.value}
// //       className="form-control" placeholder="Qty"
// //       // onChange={(event,index)=>handleEditFormChange(event,index)}

// //      //  onChange={newValue => addTagCall(newValue, rej[2])}
// //      //  onChange={(e)=>{handleRejChange([e.target.value])}}
// //      // onChange={(event) => setAmount(event.target.value)}
// //    //   onChange={handleAdjChange}
     
// //      />
// //     </tr>
// //     ))}
// // {rej && rej[2].map((aj,index)=>(
// //    <tr>
// //     <th>Production loss</th>
// //     <td>{aj[1]}</td>
// //     <input required type="text" 
// //    // ref={inputRef}
// //    //  defaultValue="null" 
// //     name={aj[2]}
// //    style={{backgroundColor:'#E8F0FE'}} 
// //    value={index.value}
// //       className="form-control" placeholder="Qty"
// //       // onChange={(event,index)=>handleEditFormChange(event,index)}

// //       //  onChange={newValue => addTagCall(newValue, rej[2])}
// //      //  onChange={(e)=>{handleRejChange([e.target.value])}}
// //      // onChange={(event) => setAmount(event.target.value)}
// //    //   onChange={handlePrdChange}
    
// //     //  onChange={handlePrdChange}
    
// //     />
// //     </tr>
// //     ))}

)
}

export default ListformEditableRow52