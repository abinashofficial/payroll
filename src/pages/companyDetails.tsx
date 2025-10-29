import React,  { useState, useContext } from "react";
// import Drawer from '@mui/material/Drawer';
// import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { locateContext } from "../App";
import { useNavigate } from "react-router-dom";




// import { useFrappeUpdateDoc } from "frappe-react-sdk";


import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { useContext } from 'react';
// import { locateContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import {  toast } from 'react-toastify';
// import type { SelectChangeEvent } from "@mui/material/Select";
// import CloseIcon from '@mui/icons-material/Close';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs, { Dayjs } from 'dayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface Location {
  latitude: number;
  longitude: number;
}



const BRANCH_LOCATIONS: Record<string, Location> = {
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
};

// const MAX_DISTANCE_METERS = 100;

const EmployeeCheckInOut: React.FC = () => {

    const {company, setCompany  } = useContext(locateContext);
  
  const navigate = useNavigate();

//   const [status, setStatus] = useState<string>("Not Checked In");
//   const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Haversine distance formula
//   const getDistanceFromLatLonInMeters = (loc1: Location, loc2: Location) => {
//     const R = 6371e3;
//     const φ1 = (loc1.latitude * Math.PI) / 180;
//     const φ2 = (loc2.latitude * Math.PI) / 180;
//     const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
//     const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) ** 2 +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

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

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setCompany((prev:any) => ({ ...prev, logo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

//   // Handle check-in/check-out
//   const handleCheckInOut = (action: "checkin" | "checkout") => {
//     if (!company.location) {
//       setError("Company location not set!");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const current: Location = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         };
//         if (!company.location) {
//   setError("Company location not set!");
//   return;
// }

//         const dist = getDistanceFromLatLonInMeters(current, company.location);
//         setDistance(dist);

//         if (dist <= MAX_DISTANCE_METERS) {
//           const timestamp = new Date().toLocaleString();
//           setStatus(`✅ ${action === "checkin" ? "Checked In" : "Checked Out"} at ${timestamp}`);
//           setError(null);

//           // Example: send to backend
//           // fetch("/api/attendance", {
//           //   method: "POST",
//           //   headers: { "Content-Type": "application/json" },
//           //   body: JSON.stringify({ company, action, location: current, timestamp }),
//           // });
//         } else {
//           setStatus("❌ You are not within the company area!");
//         }
//       },
//       (err) => setError(err.message),
//       { enableHighAccuracy: true }
//     );
//   };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-md w-full max-w-lg mx-auto mt-10">
     

        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
        }}>
            <div style={{
                            marginBottom:"20px",
            marginTop:"20px",

            }}>
          Company Logo:

            </div>

                    <label className="block mb-2">
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="block mt-1" />
        </label>
        {company.logo && (


          <img style={{
            width:"50px",
            height:"50px",
          }} src={company.logo} alt="Company Logo" className="w-24 h-24 rounded-lg mb-2 border" />

        )}
        </div>

                        <div className="fields_gap">
        <TextField
    className="req_fields"
    id="outlined-basic"
      value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
              label="Company Name"
    // value={selectedOptions.purpose}
    variant="outlined"
        sx={{
    "& .MuiInputLabel-root": {
      zIndex: 0 , // 👈 sets label z-index
    },
  }}
  />
        </div>

                <div className="fields_gap">
        <TextField
    className="req_fields"
    id="outlined-basic"
          value={company.email}
          onChange={(e) => setCompany({ ...company, email: e.target.value })}
              label="Company Email"
    // value={selectedOptions.purpose}
    variant="outlined"
    sx={{
    "& .MuiInputLabel-root": {
      zIndex: 0 , // 👈 sets label z-index
    },
  }}
  />
        </div>

        <div className="fields_gap">
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


        <div className="button_style">
          <Button className="cancel_button" onClick={()=> navigate("/payroll")}>
            Cancel
          </Button>
          <Button className='submit_button'  variant="contained" onClick={()=> navigate("/payroll")} >
            Submit
          </Button>
        </div>







    </div>
    
  );
};

export default EmployeeCheckInOut;
