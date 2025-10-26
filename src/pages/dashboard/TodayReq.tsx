import PieChart from '../../components/chart/PieChart';
import Box from '@mui/material/Box';
import {useState} from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import "./DashBoard.css"
// import { DashboardRequest } from '../track_req/DashboardReq';
import overallsvg from "../../assets/overall_png.png"
import groundpng from "../../assets/ground_png.png"
import flightpng from "../../assets/flight_png.png"
import consumablepng from "../../assets/consumable_png.png"

import { FcLeave } from "react-icons/fc";
import { HiOutlineHandRaised } from "react-icons/hi2";
// import { CiReceipt } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
import { FcBusinessContact } from "react-icons/fc";
// import { FaLocationCrosshairs } from "react-icons/fa6";
// import { FcAssistant } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
// import { FcAdvertising } from "react-icons/fc";









export function TodayRequest() {

  const [componentValue, setComponentValue] = useState<string>("Overall");
  console.log(componentValue)

  return (
    <Box sx={{ flexGrow: 1 }}>

           
      <div  style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-around",
              gap:"40px",
              // background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
              // justifyContent:"center",
              alignItems:"center",
              flexWrap:"wrap",
              // background:"white",
              marginTop:"30px",
              marginBottom:"30px",

              
            }}>
      
      
                                                          <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                                              height:"100px",
                          width:"120px",
                                      boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                                      gap:"10px",

                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < FcBusinessContact size={50} />
                          <p>Profile</p>
              
                                </div>
      
      
                                                          
                                                                                                      <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                          height:"100px",
                          width:"120px",
                                                                gap:"10px",

                                                                boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < MdLocationPin size={50} />
                          <p>Check-In / Out</p>
              
                                </div>
      
                        <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                                              height:"100px",
                          width:"120px",
                                                                boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                                                                            gap:"10px",

                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          <FcLeave size={50} />
                          <p>Attendance</p>
              
              
                               
              
              
              
                        {/* <FaEarlybirds size={50} /> */}
                        </div>
      
      
                        
                        <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                                              height:"100px",
                          width:"120px",
                                                                boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                                                                            gap:"10px",

                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < HiOutlineHandRaised size={50} />
                          <p>Leave Request</p>
              
                                </div>
      
                                                                            {/* <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                                              height:"100px",
                          width:"120px",
                                                                boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                                                                            gap:"10px",

                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < FaLocationCrosshairs size={50} />
                          <p>Track Request</p>
              
                                </div> */}
                                                  
                        {/* <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                                              height:"100px",
                          width:"120px",
                                                                boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                                      borderRadius:"10px",
                                                                            gap:"10px",

                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < CiReceipt size={50} />
                          <p>PaySlip</p>
              
                                </div> */}
      
      
      
      
      
                                                                                                      {/* <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < FcAssistant size={50} />
                          <p>Customer Care</p>
              
                                </div> */}
      
      
      {/* 
                                                          
                                                                                                      <div style={{
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"center",
                          // height:"90px",
                          cursor:"pointer",
                          alignItems:"center",
                        }}
                          //   onClick={() => setIsHovered(!isHovered)}
                        
                
                        >
                          < FcAdvertising size={50} />
                          <p>Notification</p>
              
                                </div> */}
      
      
      
            </div>


      <Box style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"10px"
      }}  flexDirection={{ xs: 'column', md: 'row' }} >

<div  style={{
  // backgroundColor:"white",
            boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",

  padding:"10px",
  borderRadius: "10px",
  marginBottom:"20px",
  cursor:"pointer",
}} 
onClick={()=>setComponentValue("Overall")}>

        <div  style={
          {
            display:"flex",
            justifyContent:"space-between",
          }
        }>
          

          <div style={{
            marginLeft:"4px",
                      width:"3px",
                      height:"50px",
                      backgroundColor:"#C7A96E"
          }}>
                      <p style={{
                        marginLeft:"10px",
                        // fontSize:"13px",
                        whiteSpace: 'nowrap' 
                      }}>
            Overall Leave
          </p>
          <p style={{
            marginLeft:"10px",
            fontWeight:"bold",
            marginTop:"5px",
            
          }}>
            15
          </p>

          </div>
          <div style={{
            height:"30px",
            width:"30px",
            margin:"5px",
          }}>
            <ArrowOutwardRoundedIcon style={{
              // fontSize:"25x",
              padding:"4px",
              border:"1px solid #C7A96E",
              borderRadius:"10px",
            }}/>

          </div>
        

          </div>

          
                    <div style={{
marginTop:"8px",
          }} >
      <img src={overallsvg} alt="coins" />

          </div>

        </div>




        
<div style={{
  // backgroundColor:"white",
            boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",

  padding:"10px",
  borderRadius: "10px",
  marginBottom:"20px",
  cursor:"pointer",
  

}} onClick={()=>setComponentValue("Ground Components")}>

        <div  style={
          {
            display:"flex",
            justifyContent:"space-between",
          }
        }>
          

          <div style={{
            marginLeft:"4px",
                      width:"3px",
                      height:"50px",
                      backgroundColor:"#CDA8FE"
          }}>
                      <p style={{
                        marginLeft:"10px",
                        // fontSize:"13px",
                        whiteSpace: 'nowrap' 
                      }}>
  Taken Leave
          </p>
          <p style={{
            marginLeft:"10px",
            fontWeight:"bold",
            marginTop:"5px",

          }}>
            8
          </p>

          </div>
          <div style={{
            height:"30px",
            width:"30px",
            margin:"5px",
  
          }}>
          <ArrowOutwardRoundedIcon style={{
            // fontSize:"25x",
            padding:"4px",
            border:"1px solid #CDA8FE",
            borderRadius:"10px",
          }}/>

          </div>
        

          </div>

          
                    <div style={{
marginTop:"8px",
          }} >
      <img src={groundpng} alt="coins" />

          </div>

        </div>



        <div style={{
                    boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",

  // backgroundColor:"white",
  padding:"10px",
  borderRadius: "10px",
  marginBottom:"20px",
  cursor:"pointer",
}}  onClick={()=>setComponentValue("Flight Components")}>

        <div  style={
          {
            display:"flex",
            justifyContent:"space-between",
          }
        }>
          

          <div style={{
            marginLeft:"4px",
                      width:"3px",
                      height:"50px",
                      backgroundColor:"#D5E2FF"
          }}>
                      <p style={{
                        marginLeft:"10px",
                        // fontSize:"13px",
                        whiteSpace: 'nowrap' 
                      }}>
  Compensation off
          </p>
          <p style={{
            marginLeft:"10px",
            fontWeight:"bold",
            marginTop:"5px",

          }}>
            3
          </p>

          </div>
          <div style={{
            height:"30px",
            width:"30px",
            margin:"5px",
          }}>
          <ArrowOutwardRoundedIcon style={{
            fontSize:"25x",
            padding:"4px",
            border:"1px solid #D5E2FF",
            borderRadius:"10px",
          }}/>

          </div>
        

          </div>

          
                    <div style={{
marginTop:"8px",
          }} >
      <img src={flightpng} alt="flight" />

          </div>

        </div>


        <div style={{
          boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
  // backgroundColor:"white",
  padding:"10px",
  borderRadius: "10px",
  marginBottom:"20px",
  cursor:"pointer",
}}  onClick={()=>setComponentValue("Consumable Components")}>

        <div  style={
          {
            display:"flex",
            justifyContent:"space-between",
          }
        }>
          

          <div style={{
            marginLeft:"4px",
                      width:"3px",
                      height:"50px",
                      backgroundColor:"#FF8B7B"
          }}>
                      <p style={{
                        marginLeft:"10px",
                        // fontSize:"13px",
                        whiteSpace: 'nowrap' 
                      }}>
  Loss of Pay
          </p>
          <p style={{
            marginLeft:"10px",
            fontWeight:"bold",
                        marginTop:"5px",

          }}>
            7
          </p>

          </div>
          <div style={{
            height:"30px",
            width:"30px",
            margin:"5px",
          }}>
          <ArrowOutwardRoundedIcon style={{
            fontSize:"25x",
            padding:"4px",
            border:"1px solid #FF8B7B",
            borderRadius:"10px",
          }}/>

          </div>
        

          </div>

          
                    <div style={{
marginTop:"8px",
          }} >
      <img src={consumablepng} alt="consumable" />

          </div>

        </div>
      
      </Box>

             <div style={{
          // backgroundColor:"white",
                    boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                    display:"flex",
                    justifyContent:"center",

          padding:"20px",
          borderRadius:"20px",

        }}>
        <PieChart/>

        </div>
      {/* {componentValue != "Overall"  &&
<GroundComponentRequest data={componentValue}/>


    } */}

      <div
      style={{
        backgroundColor:"white",
        marginTop:"20px",
        borderRadius:"10px",
      }}
      >

      {/* <DashboardRequest/> */}

      </div>
      {/* <BorderVerticalProgress variant="determinate" value={50} /> */}
      {/* <div>
      <img className="menu_icons" src={overallsvg} alt="coins" />

          </div> */}
    </Box>
  );
}



export default TodayRequest;




