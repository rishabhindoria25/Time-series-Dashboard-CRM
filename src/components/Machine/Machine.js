
import React,{ useState ,useEffect, Fragment,useRef} from 'react';
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import {Link} from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
// import '../static/Admin.css'
// import { store } from '../../State/store';
// import {getValueAction} from '../../State/Action-creators';
import MachineEditableRow from './MachineEditableRow';
import Machinetable from './Machinetable';
import Dialog from '../Prdhomepage/Dialog';
// import { connect } from 'react-redux';

function ListForm2() {
  let navigate = useNavigate()
 
  const [valueOrg,setvalueOrg]=useState([])
  // const [valuestored1,setvaluestored1]=useState([])
  useEffect(()=>{
    const abortCont=new AbortController();
    // const config = {
    //   // mode:'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     'Content-Type':'applications/json',
    //   }

    // };
    // // 'Access-Control-Allow-Credentials':false,

    // )
    fetch('http://localhost:8080/machinevalue',{
      'methods':'GET',
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'applications/json',
      }
    })
    .then(response => response.json())
    .then(response=>setvalueOrg(response))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  console.log("valueOrg")
  console.log(valueOrg)
// const [valueOrg,setvalueOrg]=useState([])
const [AddvalueOrg,setAddvalueOrg]=useState({
  Adj_loss:'',
})

const[editFormData,seteditFormData]=useState({
  // Time:'',
  Adj_loss:'',
})
const[editOrgid,seteditOrgid]=useState(null);
const handleEditclick=(event,article)=>{
  event.preventDefault();
  seteditOrgid(article[0])
  const formValues={
    Time:article[0],
    Adj_loss:article[1],
    // Part_Tool:AddvalueOrg[1],
    // Cycle:AddvalueOrg[2],
  }
  const formValuesshow={
    // Time:article[0],
    Adj_loss:article[1],
    // Part_Tool:AddvalueOrg[1],
    // Cycle:AddvalueOrg[2],
  }
  seteditFormData(formValues)
}

const handleEditFormChange=(event)=>{
event.preventDefault();
const fieldName=event.target.getAttribute('name');
// const fieldName=event.target.input;

const fieldValue=event.target.value;
   
  const newEditFormData={...editFormData};
  newEditFormData[fieldName]=fieldValue;
  seteditFormData(newEditFormData);
  
}

const handleEditFormSubmit=(event)=>{
  event.preventDefault();
  console.log(editFormData.Time)
  const isoStr = editFormData.Time
const date = new Date(isoStr);
const timestamp =String(date.getTime())+'000000';
console.log(timestamp)
 const newEditvalueOrg={
  
  Time:editFormData.Time,
  Adj_loss:editFormData.Adj_loss,
}

let newEditvalue=[
  editFormData.Time,
  editFormData.Adj_loss,
]
const newarticle=[...valueOrg];
console.log("newarticle")
console.log(newarticle)

const index=valueOrg.findIndex((article)=>article[0]===editFormData.Time)
console.log(index)
console.log("newEditvalueOrg")
console.log(newEditvalue)
newarticle[index]=newEditvalue;
setvalueOrg(newarticle)
seteditOrgid(null)

const newvalue= 'NEWTAB Machine_name=\"'+(newEditvalueOrg.Adj_loss)+'\" '+timestamp
console.log("newvalue")
console.log(newvalue)
fetch('http://localhost:8080/machinevalueedit', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newvalue})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))

}

const handleAddFormChange=(event)=>{
  event.preventDefault();
  const fieldName=event.target.getAttribute('name');
  const fieldValue=event.target.value;
   
  const newFormData={...AddvalueOrg};
  newFormData[fieldName]=fieldValue;
  setAddvalueOrg(newFormData);
}

const handleAddFormSubmit=(event)=>{
event.preventDefault();
const newvalueOrgshow={
  // Time:AddvalueOrg[0],
  Adj_loss:AddvalueOrg[1],
 
  
}
let newvalueOrgnotshow=[
  AddvalueOrg[0],
  AddvalueOrg.Adj_loss,
]
const newvalueOrg= 'NEWTAB Machine_name=\"'+(AddvalueOrg.Adj_loss)+'\" '+String(Date.now())+'000000'

const newvalueOrgs=[...valueOrg,newvalueOrgnotshow];
setvalueOrg(newvalueOrgs)
console.log(newvalueOrg)
fetch('http://localhost:8080/machinevalueadd', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newvalueOrg})
  })
  .then(()=>console.log("success Added"))
  .catch(error =>console.log(error))


  ShowForms()
}
const idProductRef = useRef();

const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  //Update
  nameProduct: ""
});
// const idProductRef = useRef();
const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    //Update
    nameProduct
  });
};


const handleDelete=(event,article)=>{
  event.preventDefault();
  

handleDialog("Are you sure you want to delete?", true);
idProductRef.current = article;
}
const areUSureDelete = (choose) => {
  if (choose) {
  const newarticle=[...valueOrg];

    const index=valueOrg.findIndex((valueOrg)=>valueOrg[0]===idProductRef.current[0])
    console.log(index)
    const Oid=idProductRef.current[0]
    console.log("Oid")
    console.log(Oid)
   //  const isoStr = editFormData.Time
    const date1 = new Date (Oid.toString());
    const timestampDel = String(date1.getTime())+'000000';
    console.log(timestampDel)
   newarticle.splice(index,1);
   setvalueOrg(newarticle)
   fetch('http://localhost:8080/machinevaluedelete', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestampDel})
  })
  .then(()=>console.log("success Added"))
  .catch(error =>console.log(error))
// Axios.post('apiurlq=Delete from NEWTAB Where time='+timestampDel,
//   ).then(res => console.log(res))
    handleDialog("", false);
  } else {
    handleDialog("", false);
  }
};
// const handleDelete=(event,article)=>{
//   event.preventDefault();
//  const newarticle=[...valueOrg];
//  const index=valueOrg.findIndex((valueOrg)=>valueOrg[0]===article[0])
//  console.log(index)
//  const Oid=article[0]
//  console.log("Oid")
//  console.log(Oid)
// //  const isoStr = editFormData.Time
//  const date1 = new Date (Oid.toString());
//  const timestampDel =String(date1.getTime())+'000000';
//  console.log(timestampDel)
// newarticle.splice(index,1);
// setvalueOrg(newarticle)
// Axios.post('apiurlq=Delete from NEWTAB Where time='+timestampDel,
      
//   ).then(res => console.log(res))
// }
  const handleCancel=()=>{
    seteditOrgid(null)
}
    // useEffect(()=>{
    //   let isMounted = true;
    //   const abortCont=new AbortController();
    //   console.log("getCustAction")
      
    //   store.dispatch(getValueAction());
    //   store.subscribe(() => {
    //     const state= store.getState();
    //     if (state.value.status == "waiting") {
    //     isMounted && setvalueOrg("Loading...");
    //     }
    //     if (state.value.status == "received") {
    //      console.log("state.data[0]")
    //      isMounted && setvalueOrg(state.value.data)
    //     }
    //     return()=>{
    //       isMounted = false;
    //       abortCont.abort();
    //     }
    //   }); 
    //  },[])
  const [ShowForm, setShowForm ] = useState(false);
  const [editForm, seteditForm ] = useState(false);
  
  const ShowForms= () => {
    setShowForm(!ShowForm);
    console.log("clicked after ShowForm"+ShowForm)

  }
  function collapseSidebar(){
      const Body =document.getElementById('body');
      Body.classList.toggle('sidebar-expand');
  
  }
  window.onclick = function (event) {
      openCloseDropdown(event)
  }
  
  function closeAllDropdown() {
      var dropdowns = document.getElementsByClassName('dropdown-expand')
      for (var i = 0; i < dropdowns.length; i++) {
          dropdowns[i].classList.remove('dropdown-expand')
      }
  }
  
  function openCloseDropdown(event) {
      if (!event.target.matches('.dropdown-toggle')) {
          closeAllDropdown()
      } else {
          var toggle = event.target.dataset.toggle
          var content = document.getElementById(toggle)
          if (content.classList.contains('dropdown-expand')) {
              closeAllDropdown()
          } else {
              closeAllDropdown()
              content.classList.add('dropdown-expand')
          }
      }
  }
 
  
    return (
            <div className="row">
              <div className="col-12 col-m-12 col-sm-12">
                <div className="card2">
                  <div className="card-header">
                    <h3 style={{textAlign: "center"}}>
                    Machine Table
                      <i className="fas fa-plus"  
                     onClick={ ShowForms }
                      />
                        
                      </h3>
                   </div>
                   <div className="card-content">
                   <form className="data" onSubmit={handleEditFormSubmit}> 
                    <table className="data-table">
                     <thead>
                     <tr>
                          <th>Machine Name</th>
                          <th>Action</th>
                       </tr>
                    </thead>
                    {ShowForm &&(
                        <tr>                
                       <td>
                      <input type="text" name="Adj_loss"style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Machine name"required="text" 
                         onChange={handleAddFormChange}
                         />
                       </td>
										 <td>
                      <button type="submit" 
                      onClick={handleAddFormSubmit}
                      className="button submit"  style={{marginBottom: "5px",backgroundColor: "#4CAF50",border: "none",color: "white",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
									  </td>
                    {/* // </table> */}
                    {/* //  </form> */}
                    </tr>

                      )}
                       {/* {
                     editForm 
                     && 
                      (
                       <tr>
                        <td>  
                         <input type="text" name="Oid"
                          value={newOid} 
                         className="form-control" placeholder="Oid"required="number" 
                         onChange={(e)=>setnewOid(e.target.value)}
                         />
									     	</td>
									    	 <td>
                          <input type="text" name="Oname"
                           value={newOname} 
                           className="form-control" placeholder="Oname"required="text" 
                           onChange={(e)=>setnewOname(e.target.value)}
                           />
									   	</td>
                     <td>
                      <input type="text" name="Address"  
                      value={newAddress} 
                      className="form-control" placeholder="Address"required="text" 
                      onChange={(e)=>setnewAddress(e.target.value)}
                      />
                     </td>
                      <td>
                       <input type="text" name="Contact"  
                       value={newContact} 
                       className="form-control" placeholder="Contact"required="text" 
                       onChange={(e)=>setnewContact(e.target.value)}
                       />
                         </td>
										 <td>
                     <button type="submit" 
                      onClick={updateList} 
                      // class="save-btn"
                      className="button submit" style={{backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                      >
                        Update</button>
									 </td>
                    </tr>
                        )  }  
                       */}
                    
                        <tbody>
                        { valueOrg && valueOrg.map(article=>(
                          <Fragment>
                            {editOrgid===article[0]?<MachineEditableRow editFormData={editFormData} handleCancel={handleCancel} handleEditFormChange={handleEditFormChange}/>:<Machinetable article={article} handleDelete={handleDelete} handleEditclick={handleEditclick}/>}
                            {dialog.isLoading && (
                              <Dialog
                                //Update
                                // nameProduct={dialog.nameProduct}
                                onDialog={areUSureDelete}
                                message={dialog.message}
                              />
                            )}
                          </Fragment>
                         ) )
                        
                    }
                      </tbody>  
                      </table>
                      </form>
                    
                  </div>
              
                </div>
              
              </div>
            </div>
  
                        )
}
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps)(ListForm);
export default ListForm2