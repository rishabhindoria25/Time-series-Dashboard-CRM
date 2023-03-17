import React from 'react'
import { Line } from "react-chartjs-2";
import { useState,useEffect } from 'react';
import axios from 'axios';
// import Hammer from 'hammerjs';
// import * as Zoom from "chartjs-plugin-zoom";
import { Button } from 'rsuite';
import { useRef } from 'react';
// import 'antd/dist/antd.css';
import { DatePicker} from 'antd';
// import * as zoom from "chartjs-plugin-zoom";
// import { Chart } from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';
// Chart.register(Zoom);
// Chart.register(Zoom);
export const ChartModel = ({LChart}) => {
 const [Chartstate, setChartState] = useState([]) 
 const [CStime, setCStime] = useState() 
 const [CEtime, setCEtime] = useState() 
 const [ChartName, setChartName] = useState('LChart') 
 
 const [checked, setChecked] = useState(true);
 const chartRef = useRef(null);
 console.log("CHARTMODEL CHartModel")
 console.log(LChart.Cid)
//  DID = LChart.Cid;
//  useEffect(() => {
//   const abortCont=new AbortController();
//   fetch('http://localhost:8080/api/LChart',{
//     'methods':'GET',
//     headers:{
//       'Content-Type':'applications/json'
//     }
//   })
//   .then(resp =>resp.json())
//   .then(resp =>setLChart(resp))
//   .catch(error =>console.log(error))

//   return()=>{
//     abortCont.abort();
//   }
// },[]);
console.log(LChart.Cid)
// const LCID=LChart.map((crypto) => crypto.Cid);
//  console.log("Cid of Line Chart"+" "+LCID);
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
            dn: LChart.Dn,
            keys: LChart.Keys, 
            starttime: LChart.StartTime,
          endtime: LChart.EndTime,
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
var KeyData=LChart.Keys

      setChartState({
        labels: newArr,
        datasets: [
          {
            label: KeyData,
            // fillBetweenSet: 1,
            // fillBetweenColor: "rgba(5,5,255, 0.2)",
            data: data.data.map((crypto) => crypto[KeyData]),
            backgroundColor:getRandomColors(newArr.length),
            //  [
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
          //     'rgba(255, 99, 132, 0.2)',
          //     'rgba(54, 162, 235, 0.2)',
          //     'rgba(255, 206, 86, 0.2)',
          //     'rgba(75, 192, 192, 0.2)',
          //     'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
          // ],
          // borderColor:getRandomColors(newArr.length),
          borderColor: [
              // 'rgba(255, 99, 132, 1)',
              // 'rgba(54, 162, 235, 1)',
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
              // 'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
          fill:false,
          },
        ],
    }    
  )
    
    };
   
    const Cid=LChart.Cid;
    const DeleteChart = () => { 
      console.log("Clickeed")
      console.log(Cid)
      console.log(ChartName)
      axios.delete(`http://localhost:8080/DeleteChart/${Cid}/${ChartName}`,
      
      ).then(res => console.log(res))
      // fetch(`http://localhost:8080/DeleteChart/${Cid}/${ChartName}`,
      // {
      // 'methods':'DELETE',
      // headers:{
      //   'Content-Type':'application/json',
      //   // 'Access-Control-Allow-Origin':'http://localhost:3000'
      // }
      // })
      // // .then( response => response.json() )
      // .then( data => console.log(data) )
      // .then(res => console.log(res))
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
const resetZoomBar = () => {
  console.log("Clicked")
  chartRef.current.chartInstance.resetZoom()
}
//  const Reset=()=>{
//    Line.resetZoom();
//  }
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
axios.post("http://localhost:8080/IndLinetime", {
    StartTime: StartTime,
    EndTime: EndTime,
    Cid:LChart.Cid
    
  }).then((response) => {
    console.log("success Chart");
    console.log("FROM FRONT"+JSON.stringify(response))
  })
  window.location.reload();

};

  return (
    <div style={{padding:'10px'}}>
        <ul className="navbar-nav">
          <li className="nav-links">
            <i class="fas fa-reply" 
             ref={chartRef} onClick={resetZoomBar}></i>
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
      <Line  ref={chartRef}
        data=
        {Chartstate}
        options={
          
          {
          responsive:true,
          // title: { text: "V1 Values With time", display: true },
          scales:{
              // yAxes:[{
              //     ticks:{
              //         beginAtZero: true
              //     }
              // }],
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
            //   yAxes:{
            //       ticks:{
            //           beginAtZero: true
            //       }
            //   },
            //     xAxes: {
            //         type: 'time',
            //         time: {
            //             displayFormats: {
            //               'hour': 'h:mm a',
            //             }
            //         }
            //     },
            
            // //   XAxes:{
            // //     ticks:{
            // //         beginAtZero: true
            // //     },
                
            // // }
          
          },
          pan: {
            enabled: true,
            mode: "x",
            // speed: 1,
            threshold: 10,
          },
         zoom: {
            enabled: true,
            drag: true,
            drag: {
                      	 borderColor: 'rgba(225,225,225,0.3)',
                      	 borderWidth: 5,
                      	 backgroundColor: 'rgb(225,225,225)',
                      	 animationDuration: 0
                      },
            // mode: "x",
            // limits: {
            //   max: 1,
            //   min: 0.5,
            // },
            // rangeMin: {
            //   x: 100,
            //   y: 100,
            // },
            // rangeMax: {
            //   x: 100,
            //   y: 250,
            // },
          }
          
        }
        
      } 
        //   plugins: {
        //     zoom: {
        //       zoom: {
        //         wheel: {
        //           enabled: true // SET SCROOL ZOOM TO TRUE
        //         },
        //         mode: "xy",
        //         speed: 100
        //       },
        //       pan: {
        //         enabled: true,
        //         mode: "xy",
        //         speed: 100
        //       }
        //     }
        //   }
        // }
        // {
        //   plugins: {
        //     zoom: {
        //       // Container for pan options
        //       pan: {
        //         // Boolean to enable panning
        //         enabled: true,
        //         // Panning directions. Remove the appropriate direction to disable
        //         // Eg. 'y' would only allow panning in the y direction
        //         // A function that is called as the user is panning and returns the
        //         // available directions can also be used:
        //         //   mode: function({ chart }) {
        //         //     return 'xy';
        //         //   },
        //         mode: 'xy',
        //         rangeMin: {
        //           // Format of min pan range depends on scale type
        //           x: null,
        //           y: null
        //         },
        //         rangeMax: {
        //           // Format of max pan range depends on scale type
        //           x: null,
        //           y: null
        //         },
        //         // On category scale, factor of pan velocity
        //         speed: 20,
        //         // Minimal pan distance required before actually applying pan
        //         threshold: 10,
        //         // Function called while the user is panning
        //         onPan: function({chart}) { console.log(`I'm panning!!!`); },
        //         // Function called once panning is completed
        //         onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
        //       },
        //       // Container for zoom options
        //       zoom: {
        //         // Boolean to enable zooming
        //         enabled: true,
        //         // Enable drag-to-zoom behavior
        //         drag: true,
        //         // Drag-to-zoom effect can be customized
        //         // drag: {
        //         // 	 borderColor: 'rgba(225,225,225,0.3)'
        //         // 	 borderWidth: 5,
        //         // 	 backgroundColor: 'rgb(225,225,225)',
        //         // 	 animationDuration: 0
        //         // },
        //         // Zooming directions. Remove the appropriate direction to disable
        //         // Eg. 'y' would only allow zooming in the y direction
        //         // A function that is called as the user is zooming and returns the
        //         // available directions can also be used:
        //         //   mode: function({ chart }) {
        //         //     return 'xy';
        //         //   },
        //         mode: 'xy',
        //         rangeMin: {
        //           // Format of min zoom range depends on scale type
        //           x: null,
        //           y: null
        //         },
        //         rangeMax: {
        //           // Format of max zoom range depends on scale type
        //           x: null,
        //           y: null
        //         },
        //         // Speed of zoom via mouse wheel
        //         // (percentage of zoom on a wheel event)
        //         speed: 0.1,
        //         // Minimal zoom distance required before actually applying zoom
        //         threshold: 2,
        //         // On category scale, minimal zoom level before actually applying zoom
        //         sensitivity: 3,
        //         // Function called while the user is zooming
        //         onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
        //         // Function called once zooming is completed
        //         onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
        //       }
        //     }
        //   }
        // }  
      //     {
      //     responsive:true,
      //     title: { text: "V1,V2 Values With time", display: true },
      //     scales:{
      //         yAxes:{
      //             ticks:{
      //                 beginAtZero: true
      //             }
      //         },
              
      //       //   XAxes:{
      //       //     ticks:{
      //       //         beginAtZero: true
      //       //     },
                
      //       // }
          
      //     }
      // },
    //  { 
    //   plugins: {
    //     zoom: {
    //       zoom: {
    //         wheel: {
    //           enabled: true,
    //         },
    //         pinch: {
    //           enabled: true
    //         },
    //         mode: 'xy',
    //       }
    //     }
    //   }
    // }
  // }
      />
    </div>
  );
};


export default ChartModel