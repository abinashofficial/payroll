import Box from '@mui/material/Box';
import { FcLeave } from "react-icons/fc";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { CiReceipt } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
import { FcBusinessContact } from "react-icons/fc";
import { FaLocationCrosshairs } from "react-icons/fa6";
// import { FcAssistant } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
// import { FcAdvertising } from "react-icons/fc";
import "./LandingPage.css"

import { useContext, useEffect } from "react";
import { locateContext } from "../../App";
import { useNavigate } from "react-router-dom";


export function LandingPage() {
    const { employeeRole} = useContext(locateContext);
  const navigate = useNavigate();

    useEffect(() => {
      if (!employeeRole) {
        navigate("/");
      }
    }, [employeeRole]);



    return (
      <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }}
      >


      
<div  style={{
        display:"flex",
        flexDirection:"row",
        // justifyContent:"space-around",
        gap:"40px",
        // background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '60vh', // Ensure it takes full viewport height
        justifyContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
        // background:"white",
        // marginTop:"100px",
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
                  }}
                      onClick={() => navigate("/payroll/checkin")}
                  
          
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
                  }}
                    //   onClick={() => setIsHovered(!isHovered)}
                  
          
                  >
                    < HiOutlineHandRaised size={50} />
                    <p>Raise Request</p>
        
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
                  }}
                    //   onClick={() => setIsHovered(!isHovered)}
                  
          
                  >
                    < FaLocationCrosshairs size={50} />
                    <p>Track Request</p>
        
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
                  }}
                    //   onClick={() => setIsHovered(!isHovered)}
                  
          
                  >
                    < CiReceipt size={50} />
                    <p>PaySlip</p>
        
                          </div>





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

      </Box>
    )
}

export default LandingPage;
