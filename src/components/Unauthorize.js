import { useNavigate } from "react-router-dom";
import notfound from "../static/images/Caution-Tape-big.png";

const Unauthorized = () => {

  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
   <div id="wrapper" style={{position:'absolute',top:'0px',right:'0px',bottom:'0px',left:'0px',textAlign: 'center',backgroundColor: '#254E80',color: '#fff'}}> 
     <div id="info">
    <img src={notfound} style={{width: '30%',margin: 'auto',display: 'block'}}/>
    <h1>404 Page not Found!</h1>
    <button onClick={goBack} style={{borderRadius:'20px',border: '1px solid #0c0808',backgroundColor: '#254E80',color: '#FFFFFF',fontSize: '12px',fontWeight: 'bold',padding: '12px 45px',letterSpacing: '1px',textTransform: 'uppercase',transition: 'transform 80ms ease-in',marginTop: '10px',backgroundColor:'transparent',borderColor:'#FFFFFF'}}>Go Back</button>
    </div>
    </div>
  );
};
export default Unauthorized;



