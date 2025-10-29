import React, { useState, useContext } from "react";
import { locateContext } from "../App";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



interface Location {
  latitude: number;
  longitude: number;
}



const BRANCH_LOCATIONS: Record<string, Location> = {
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
};

const MAX_DISTANCE_METERS = 100; // Allowed radius

const CheckInOut: React.FC = () => {
  const [status, setStatus] = useState<string>("Not Checked In");
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(true);

      const {company, setData, setCompany  } = useContext(locateContext);
      const [activeStep, setActiveStep] = React.useState(0);
      const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
//   const [totalHours, setTotalHours] = useState<string | null>(null);
  const navigate = useNavigate();

  // Calculate total hours
  const calculateHours = (checkIn: any, checkOut: any) => {
    const diffMs = checkOut.getTime() - checkIn.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  // Calculate distance using Haversine formula
  const getDistanceFromLatLonInMeters = (loc1: Location, loc2: Location) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleCheckInOut = (action: any) => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
          setVisible(true)

      return;
    }
    if ( company.location===null ) {
      setError("Please Select Branch");
          setVisible(true)

      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const dist = getDistanceFromLatLonInMeters(currentLocation, company.location);
        setDistance(dist);

        if (dist <= MAX_DISTANCE_METERS) {
          const timestamp = new Date().toLocaleString();
                    const now = new Date();
                    if (action===0){
                              setCheckInTime(now)
          setStatus(`Checked In at ${timestamp}`);
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
                          setVisible(true)
                      return
                    }else{

          setCheckOutTime(now)
          setStatus(`Checked Out at ${timestamp}`);
          
                    setStatus(`Total Working Hours - ${calculateHours(checkInTime, now)}`);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setVisible(true)
      return
                    }

          // Example: send to backend
          // fetch("/api/attendance", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ action, location: currentLocation, timestamp }),
          // });

        } else {
        //   setStatus("❌ You are not within the company area!");
          setError("❌ You are not within the company area!")
              setVisible(true)
              return;
        }
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };


  const handleNext = (index :any) => {
     setError("")
    setVisible(!visible)
    console.log(index);
    handleCheckInOut(index)
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

  const addAttendance = () => {
    // Get current date and time
    const now = new Date();
    const localDate = now.toLocaleDateString("en-CA"); // e.g., "2025-10-29"
    const localTimeStart = checkInTime?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // e.g., "14:35"

        const localTimeEnd = checkOutTime?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // e.g., "14:35"

    // Create new record
    const newRecord = {
      request_type: "Attendance",
      dashboard_date: localDate,
      start_time: localTimeStart,
      end_time:localTimeEnd,
      request_status: "Present",
      employee_id: "E001",
    };

    // Append new record
    setData((prevData:any) => [...prevData, newRecord]);
  };

  const handleReset = () => {
addAttendance()
    setCheckInTime(null);
    setCheckOutTime(null);
    setActiveStep(0);
    navigate("/payroll")
  };

  // Get current user location and set as company location
  const handleSetCurrentLocation = () => {
    if (!navigator.geolocation) {
    //   setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setCompany((prev:any) => ({ ...prev, location: loc }));
        // setError(null);
        // setStatus("📍 Current location set for company!");
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };
    // Handle branch selection
  const handleBranchChange = (branch: string) => {
    let loc = null;
    if (branch === "Bangalore" || branch === "Chennai") {
      loc = BRANCH_LOCATIONS[branch];
    } else if (branch === "Current Location") {
      handleSetCurrentLocation();
    }
    setCompany((prev:any) => ({ ...prev, branch, location: loc }));
    console.log(error)
  };
  return (
    <div 
    style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        // width:"100%",
        // height:"60vh",
    }}
    >






{visible ?(
  <div>
            <div className="fields_gap" style={{
              marginBottom:"20px",
              display:checkInTime? "none":"block"
            }}>
          <FormControl
              sx={{
      "& .MuiInputLabel-root": { zIndex: 0 }, // ✅ label below overlay
    }}
          className="req_fields">
            <InputLabel
            id="category">Branches</InputLabel>
            <Select
              labelId="category"
              id="category-select"
           value={company.branch}
            onChange={(e) => handleBranchChange(e.target.value)}
              label="Category"
            >
                <MenuItem key={"Select Branch"} value={"Select Branch"}>
                  Select Branch
                </MenuItem>
                                <MenuItem key={"Bangalore"} value={"Bangalore"}>
                  Bangalore
                </MenuItem>
                                                <MenuItem key={"Chennai"} value={"Chennai"}>
                  Chennai
                </MenuItem>
                            <MenuItem key={"Current Location"} value={"Current Location"}>
                  Use My Current Location
                </MenuItem>
                

            </Select>
          </FormControl>
        </div>

           <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={"Check - IN"}>
            <StepLabel
              optional=
              {checkInTime?(
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                    }}>

                  <Typography variant="caption">Approved</Typography>
                                    <Typography variant="caption">Check - IN - {checkInTime?.toLocaleString()}</Typography>

        </div>):null


              }
              
            >
  
              {"Check - IN"}
            </StepLabel>
            <StepContent>
              <Typography>

                      <p className="text-gray-600 mb-2">Company Radius: {MAX_DISTANCE_METERS} meters</p>
      {distance !== null && (
        <div>
        <p className="text-gray-600 mb-4">Distance from Office: {distance.toFixed(2)} m</p>

        </div>


      )}
                          {error && <p className="text-red-500 mt-2">{error}</p>}

              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={()=>handleNext(0)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
                  Check In
                </Button>
                {/* <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button> */}
              </Box>
            </StepContent>
          </Step>



           <Step key={"Check - Out"}>
            <StepLabel
              optional=
              {checkOutTime?(
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                    }}>
                        
                  <Typography variant="caption">Approved</Typography>
                                                      <Typography variant="caption">Check - Out - {checkOutTime?.toLocaleString()}</Typography>

        </div>
              ):null


              }
              
            >
  
              {"Check - Out"}
            </StepLabel>
            <StepContent>
              <Typography>

                      <p className="text-gray-600 mb-2">Company Radius: {MAX_DISTANCE_METERS} meters</p>
      {distance !== null && (
        <div>
        <p className="text-gray-600 mb-4">Distance from Office: {distance.toFixed(2)} m</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}

        </div>


      )}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={()=>handleNext(1)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
                  Check Out
                </Button>
                {/* <Button
                //   disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button> */}
              </Box>
            </StepContent>
          </Step>
      </Stepper>
      {activeStep === 2 && (
        <div>

        <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>Date- {Date().toLocaleString()}</Typography>

          <Typography>{status}</Typography>
          
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Ok
          </Button>
        </Paper>
                </div>

      )}
    </Box>
  </div>
):(
  <div className="spinner">

  </div>
)}



    </div>
  );
};

export default CheckInOut;


// import React, { useState, useEffect } from "react";

// interface Location {
//   latitude: number;
//   longitude: number;
// }

// const MAX_DISTANCE_METERS = 100; // Allowed radius

// const CheckInOut: React.FC = () => {
//   const [companyLocation, setCompanyLocation] = useState<Location | null>(null);
//   const [distance, setDistance] = useState<number | null>(null);
//   const [status, setStatus] = useState<string>("Not Checked In");
//   const [error, setError] = useState<string | null>(null);

//   // Load saved company location (if any)
//   useEffect(() => {
//     const saved = localStorage.getItem("companyLocation");
//     if (saved) setCompanyLocation(JSON.parse(saved));
//   }, []);

//   // Haversine distance calculation
//   const getDistanceFromLatLonInMeters = (loc1: Location, loc2: Location) => {
//     const R = 6371e3;
//     const φ1 = (loc1.latitude * Math.PI) / 180;
//     const φ2 = (loc2.latitude * Math.PI) / 180;
//     const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
//     const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) *
//       Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // Set current location as company location
//   const handleSetCompanyLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const loc = {
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         };
//         setCompanyLocation(loc);
//         localStorage.setItem("companyLocation", JSON.stringify(loc));
//         setError(null);
//         setStatus("🏢 Company location set successfully!");
//       },
//       (err) => setError(err.message),
//       { enableHighAccuracy: true }
//     );
//   };

//   // Check in / out logic
//   const handleCheckInOut = (action: "checkin" | "checkout") => {
//     if (!companyLocation) {
//       setError("Please set the company location first!");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const currentLocation: Location = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         };

//         const dist = getDistanceFromLatLonInMeters(currentLocation, companyLocation);
//         setDistance(dist);

//         if (dist <= MAX_DISTANCE_METERS) {
//           const timestamp = new Date().toLocaleString();
//           setStatus(`✅ ${action === "checkin" ? "Checked In" : "Checked Out"} at ${timestamp}`);
//           setError(null);

//           // Example: send to backend
//           // fetch("/api/attendance", {
//           //   method: "POST",
//           //   headers: { "Content-Type": "application/json" },
//           //   body: JSON.stringify({ action, location: currentLocation, timestamp }),
//           // });
//         } else {
//           setStatus("❌ You are not within the company area!");
//         }
//       },
//       (err) => setError(err.message),
//       { enableHighAccuracy: true }
//     );
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Employee Check-In / Check-Out</h2>

//       {companyLocation ? (
//         <p className="text-gray-600 mb-3">
//           📍 Company Location: {companyLocation.latitude.toFixed(4)}, {companyLocation.longitude.toFixed(4)}
//         </p>
//       ) : (
//         <p className="text-gray-600 mb-3">No company location set yet.</p>
//       )}

//       <button
//         onClick={handleSetCompanyLocation}
//         className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
//       >
//         Set Company Location (Use My Current Location)
//       </button>

//       {distance !== null && (
//         <p className="text-gray-600 mb-3">Distance from Office: {distance.toFixed(2)} m</p>
//       )}

//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => handleCheckInOut("checkin")}
//           className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
//         >
//           Check In
//         </button>
//         <button
//           onClick={() => handleCheckInOut("checkout")}
//           className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
//         >
//           Check Out
//         </button>
//       </div>

//       <p className="text-lg font-medium">{status}</p>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default CheckInOut;

