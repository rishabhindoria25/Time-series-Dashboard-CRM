import React from 'react';
import { Pie} from "react-chartjs-2";
import { useState,useEffect} from 'react';
import axios from 'axios';
import Hammer from 'hammerjs';
import * as Zoom from "chartjs-plugin-zoom";
// import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { Button } from 'rsuite';
import { useRef } from 'react';
export const PieChart = ({PChart}) => {
 const chartRefBar = useRef(null);

 const [Chartstate, setChartState] = useState([]) 
 const [CStime, setCStime] = useState() 
 const [CEtime, setCEtime] = useState() 
 const [checked, setChecked] = useState(true);
 const [ChartName, setChartName] = useState('PChart') 
const getRandomColors=(numOfBars)=>{
  const letters ="0123456789ABCDEF".split("")
  let colors=[];
  for(let i=0;i<numOfBars;i++){
    let color="#"
    for(let k=0;k<6;k++){
    color +=letters[Math.floor(Math.random()*16)];
  }
  colors.push(color)
}
return colors
}

 const fetchPrices = async() => {
      
  const headers = {
    "Access-Control-Allow-Origin": 'http://localhost:3000',
    'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Accept': 'application/json',
    'Content-Type': 'applications/json',
  }
  
  const body = {
    username: "rishabh",
    password:"PasswordMustBeDifficultToGuess",
        dn: PChart.Dn,
        // keys: "i3,pf3,pf2,v1,v2", 
        keys: PChart.Keys, 
        starttime: PChart.StartTime,
      endtime: PChart.EndTime,
        }
console.log("_____________________")
       console.log(body)
        async function harry(){
          const response=await  axios.post('apiurl',JSON.stringify(body), {
                headers: headers
              })
          const users= await response;
          return users;
            }
         let a= harry();
  const data =await a
console.log("_____________________")
console.log(JSON.stringify(data))
console.log("_____________________")
function convertEpochToSpecificTimezone(timeEpoch){
var d = new Date(timeEpoch);
var utc = d.getTime() 
var nd = new Date(utc) 
return nd.toLocaleString();
}
let empSal = [];
for(const dataObj of data.data){
empSal.push(parseInt(dataObj.Time));
}
console.log("_____________________Array")
console.log(empSal)
var len = empSal.length;
let newArr = [];
for(var i = 0; i < len; i++) {
var item=convertEpochToSpecificTimezone(empSal[i],+5.30)
newArr.push(item);
}
console.log("time")
console.log(newArr)
var KeyData=PChart.Keys
console.log("keydata")
console.log(KeyData)
  setChartState({
    labels: newArr,
    datasets: [
      {
        label: KeyData,
        
        // fillBetweenSet: 1,
        // fillBetweenColor: "rgba(5,5,255, 0.2)",
        data: data.data.map((crypto) => crypto[KeyData]),
        backgroundColor: getRandomColors(newArr.length),
      //     'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)',
      //     'rgba(255, 99, 132, 0.2)',
      //     'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)',
      //     'rgba(255, 99, 132, 0.2)',
      //     'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)',
      //     'rgba(255, 99, 132, 0.2)',
      //     'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)',
      // ],
      // borderColor: [
      //     'rgba(255, 99, 132, 1)',
      //     'rgba(54, 162, 235, 1)',
      //     'rgba(255, 206, 86, 1)',
      //     'rgba(75, 192, 192, 1)',
      //     'rgba(153, 102, 255, 1)',
      //     'rgba(255, 159, 64, 1)',
      //     'rgba(255, 99, 132, 1)',
      //     'rgba(54, 162, 235, 1)',
      //     'rgba(255, 206, 86, 1)',
      //     'rgba(75, 192, 192, 1)',
      //     'rgba(153, 102, 255, 1)',
      //     'rgba(255, 159, 64, 1)',
      //     'rgba(255, 99, 132, 1)',
      //     'rgba(54, 162, 235, 1)',
      //     'rgba(255, 206, 86, 1)',
      //     'rgba(75, 192, 192, 1)',
      //     'rgba(153, 102, 255, 1)',
      //     'rgba(255, 159, 64, 1)',
      //     'rgba(255, 99, 132, 1)',
      //     'rgba(54, 162, 235, 1)',
      //     'rgba(255, 206, 86, 1)',
      //     'rgba(75, 192, 192, 1)',
      //     'rgba(153, 102, 255, 1)',
      //     'rgba(255, 159, 64, 1)',
      // ],
      borderWidth: 1
      },
    ],
}    
)

};
const Cid=PChart.Cid;
const DeleteChart = () => { 
  console.log("Clickeed")
  console.log(PChart.Cid)
  console.log(ChartName)
  
  axios.delete(`http://localhost:8080/DeleteChart/${Cid}/${ChartName}`,
      
  ).then(res => console.log(res))
  window.location.reload();
}



useEffect(() => {
const abortCont=new AbortController();
fetchPrices()
console.log("_____________________")
console.log(Chartstate)
return()=>{
abortCont.abort();
}
}, []);
const { RangePicker } = DatePicker;

// const onChange = (value, dateString) => {
const onChange = (value) => {
  
  // console.log('Selected Time: ',JSON.stringify(value));
  // setNDtime(JSON.stringify(value))
  let Value= JSON.stringify(value)
  console.log("Ndtime")
let date=Value.replace(/[\[\]']+/g,'')
let value1 = date.replace(/\"/g, "");
let newArray = value1.split(',');
var start=newArray[0];
var End=newArray[1];
var StartTime = ((new Date(start)).getTime() /1000) *1000;
var EndTime = ((new Date(End)).getTime() /1000) *1000;
console.log(StartTime);
console.log(EndTime);
setCStime(StartTime);
setCEtime(EndTime);
axios.post("http://localhost:8080/IndPietime", {
    StartTime: StartTime,
    EndTime: EndTime,
    Cid:PChart.Cid
    
  }).then((response) => {
    console.log("success Chart");
    console.log("FROM FRONT"+JSON.stringify(response))
  })
  window.location.reload();

};
const resetZoom = () => {
  chartRefBar.current.chartInstance.resetZoom()
}
  return (
    <div style={{padding:'10px'}}>
        <ul className="navbar-nav">
          <li className="nav-links">
            <i class="fas fa-reply" 
             ref={chartRefBar} onClick={resetZoom}></i>
          </li>
          <li className="nav-links">
          <RangePicker  disabled={checked}
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      /> 
      </li>
      <li className="nav-links">
      <input type="checkbox" 
        onChange={() => setChecked(!checked)}/><span 
        >Use Individual Time</span> 
        </li>
          <li className="nav-links">
        <i class="far fa-trash-alt fa-2x" 
                        onClick={DeleteChart}></i>
          </li>
        </ul>
      <Pie ref={chartRefBar}
        data=
        {Chartstate}
        options={{
          responsive:true,
          // title: { text: "V2 Values With time", display: true },
          scales:{
              yAxes:{
                  ticks:{
                      beginAtZero: true
                  }
              },
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    // 'millisecond': 'MMM DD',
                    // 'second': 'MMM DD',
                    // 'minute': 'MMM DD',
                    'hour': 'MMM DD',
                    // 'day': 'MMM DD',
                    // 'week': 'MMM DD',
                    // 'month': 'MMM DD',
                    // 'quarter': 'MMM DD',
                    // 'year': 'MMM DD',
                  }
                }
              }],
            //   XAxes:{
            //     ticks:{
            //         beginAtZero: true
            //     },
                
            // }
          },
          pan: {
            enabled: true,
            mode: "xy",
            speed: 1,
            threshold: 1,
          },
         zoom: {
            enabled: true,
            drag: false,
            mode: "xy",
            limits: {
              max: 1,
              min: 0.5,
            },
            rangeMin: {
              x: 2,
              y: 1,
            },
            rangeMax: {
              x: 1,
              y: 250,
            },
          },
      }}
      />
    </div>
  );
};

export default PieChart