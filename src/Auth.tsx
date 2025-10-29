import React , {useContext, useEffect, useState} from 'react';
// import { useFrappeAuth } from 'frappe-react-sdk';
import { locateContext } from "./App";
import { useNavigate } from "react-router-dom";

// import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { Dayjs } from "dayjs";

// import { RiTimeLine } from 'react-icons/ri';





// interface Role {
//   role: string; // Assuming role is a string, adjust it according to your data structure
//   // Add other properties if there are any
// }


interface LeaveRequest { 
  request_id: string;
  employee_id: string;
  employee_name: string;
  leave_type: string; 
  status: string;
  description: string;
  report_to: string;
  created_at: string;
  updated_at: string;
  reject_reason: string;
  cancel_reason: string;

  // ✅ Newly added fields
  datetime_from: string;   // Start date/time of leave
  datetime_to: string;     // End date/time of leave
}

const leaveRequests: LeaveRequest[] = [
  { request_id: "REQ001", employee_id: "EMP1001", employee_name: "Abirami C", leave_type: "Casual Leave (CL)", status: "Approved", description: "Family function", report_to: "Karthik M", created_at: "2025-10-01T09:00:00Z", updated_at: "2025-10-02T09:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-05T09:00:00Z", datetime_to: "2025-10-06T18:00:00Z" },
  { request_id: "REQ002", employee_id: "EMP1002", employee_name: "Prakash D", leave_type: "Sick Leave (SL)", status: "Pending", description: "Fever and rest", report_to: "Nisha R", created_at: "2025-10-03T08:30:00Z", updated_at: "2025-10-03T08:30:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-07T09:00:00Z", datetime_to: "2025-10-09T18:00:00Z" },
  { request_id: "REQ003", employee_id: "EMP1003", employee_name: "Nisha R", leave_type: "Others", status: "Rejected", description: "Vacation", report_to: "Arun V", created_at: "2025-10-04T10:00:00Z", updated_at: "2025-10-05T11:00:00Z", reject_reason: "Project deadline", cancel_reason: "", datetime_from: "2025-10-10T09:00:00Z", datetime_to: "2025-10-15T18:00:00Z" },
  { request_id: "REQ004", employee_id: "EMP1004", employee_name: "Karthik M", leave_type: "Others", status: "Cancelled", description: "Worked on holiday", report_to: "Abirami C", created_at: "2025-10-06T07:00:00Z", updated_at: "2025-10-07T12:00:00Z", reject_reason: "", cancel_reason: "Task rescheduled", datetime_from: "2025-10-12T09:00:00Z", datetime_to: "2025-10-12T18:00:00Z" },
  { request_id: "REQ005", employee_id: "EMP1005", employee_name: "Arun V", leave_type: "Paternity Leave (PL)", status: "Approved", description: "Childbirth leave", report_to: "HR Department", created_at: "2025-10-02T09:15:00Z", updated_at: "2025-10-03T11:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-10T09:00:00Z", datetime_to: "2025-10-24T18:00:00Z" },
  { request_id: "REQ006", employee_id: "EMP1006", employee_name: "Priya S", leave_type: "Casual Leave (CL)", status: "Approved", description: "Personal work", report_to: "Karthik M", created_at: "2025-10-08T09:45:00Z", updated_at: "2025-10-08T10:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-14T09:00:00Z", datetime_to: "2025-10-15T18:00:00Z" },
  { request_id: "REQ007", employee_id: "EMP1007", employee_name: "Rahul K", leave_type: "Sick Leave (SL)", status: "Pending", description: "Migraine", report_to: "Nisha R", created_at: "2025-10-09T08:20:00Z", updated_at: "2025-10-09T08:20:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-16T09:00:00Z", datetime_to: "2025-10-17T18:00:00Z" },
  { request_id: "REQ008", employee_id: "EMP1008", employee_name: "Anita R", leave_type: "Others", status: "Approved", description: "Holiday trip", report_to: "Arun V", created_at: "2025-10-10T10:30:00Z", updated_at: "2025-10-11T11:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-20T09:00:00Z", datetime_to: "2025-10-25T18:00:00Z" },
  { request_id: "REQ009", employee_id: "EMP1009", employee_name: "Vikram S", leave_type: "Others", status: "Approved", description: "Worked weekend", report_to: "Abirami C", created_at: "2025-10-11T07:50:00Z", updated_at: "2025-10-11T09:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-18T09:00:00Z", datetime_to: "2025-10-18T18:00:00Z" },
  { request_id: "REQ010", employee_id: "EMP1010", employee_name: "Deepa M", leave_type: "Casual Leave (CL)", status: "Rejected", description: "Urgent personal work", report_to: "Karthik M", created_at: "2025-10-12T09:30:00Z", updated_at: "2025-10-12T12:00:00Z", reject_reason: "Project pending", cancel_reason: "", datetime_from: "2025-10-22T09:00:00Z", datetime_to: "2025-10-23T18:00:00Z" },
  { request_id: "REQ011", employee_id: "EMP1011", employee_name: "Suresh P", leave_type: "Sick Leave (SL)", status: "Approved", description: "Cold & flu", report_to: "Nisha R", created_at: "2025-10-13T08:10:00Z", updated_at: "2025-10-13T08:30:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-24T09:00:00Z", datetime_to: "2025-10-25T18:00:00Z" },
  { request_id: "REQ012", employee_id: "EMP1012", employee_name: "Meena K", leave_type: "Others", status: "Pending", description: "Traveling abroad", report_to: "Arun V", created_at: "2025-10-14T10:00:00Z", updated_at: "2025-10-14T10:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-28T09:00:00Z", datetime_to: "2025-10-30T18:00:00Z" },
  { request_id: "REQ013", employee_id: "EMP1013", employee_name: "Ramesh T", leave_type: "Others", status: "Approved", description: "Worked on public holiday", report_to: "Abirami C", created_at: "2025-10-15T07:40:00Z", updated_at: "2025-10-15T08:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-26T09:00:00Z", datetime_to: "2025-10-26T18:00:00Z" },
  { request_id: "REQ014", employee_id: "EMP1014", employee_name: "Priyanka S", leave_type: "Casual Leave (CL)", status: "Cancelled", description: "Family event", report_to: "Karthik M", created_at: "2025-10-16T09:25:00Z", updated_at: "2025-10-17T10:00:00Z", reject_reason: "", cancel_reason: "Plans changed", datetime_from: "2025-10-27T09:00:00Z", datetime_to: "2025-10-28T18:00:00Z" },
  { request_id: "REQ015", employee_id: "EMP1015", employee_name: "Vijay R", leave_type: "Sick Leave (SL)", status: "Pending", description: "Stomach infection", report_to: "Nisha R", created_at: "2025-10-17T08:00:00Z", updated_at: "2025-10-17T08:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-10-29T09:00:00Z", datetime_to: "2025-10-30T18:00:00Z" },
  { request_id: "REQ016", employee_id: "EMP1016", employee_name: "Anil K", leave_type: "Others", status: "Approved", description: "Long vacation", report_to: "Arun V", created_at: "2025-10-18T10:15:00Z", updated_at: "2025-10-19T11:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-01T09:00:00Z", datetime_to: "2025-11-05T18:00:00Z" },
  { request_id: "REQ017", employee_id: "EMP1017", employee_name: "Lakshmi P", leave_type: "Others", status: "Approved", description: "Worked extra hours", report_to: "Abirami C", created_at: "2025-10-19T07:35:00Z", updated_at: "2025-10-19T08:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-06T09:00:00Z", datetime_to: "2025-11-06T18:00:00Z" },
  { request_id: "REQ018", employee_id: "EMP1018", employee_name: "Sonia R", leave_type: "Casual Leave (CL)", status: "Rejected", description: "Urgent personal work", report_to: "Karthik M", created_at: "2025-10-20T09:10:00Z", updated_at: "2025-10-20T11:00:00Z", reject_reason: "Project priority", cancel_reason: "", datetime_from: "2025-11-08T09:00:00Z", datetime_to: "2025-11-09T18:00:00Z" },
  { request_id: "REQ019", employee_id: "EMP1019", employee_name: "Rohit M", leave_type: "Sick Leave (SL)", status: "Approved", description: "Fever", report_to: "Nisha R", created_at: "2025-10-21T08:05:00Z", updated_at: "2025-10-21T08:30:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-10T09:00:00Z", datetime_to: "2025-11-11T18:00:00Z" },
  { request_id: "REQ020", employee_id: "EMP1020", employee_name: "Divya S", leave_type: "Others", status: "Pending", description: "Holiday trip", report_to: "Arun V", created_at: "2025-10-22T10:00:00Z", updated_at: "2025-10-22T10:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-12T09:00:00Z", datetime_to: "2025-11-15T18:00:00Z" },
  { request_id: "REQ021", employee_id: "EMP1021", employee_name: "Kiran P", leave_type: "Others", status: "Cancelled", description: "Worked on weekend", report_to: "Abirami C", created_at: "2025-10-23T07:50:00Z", updated_at: "2025-10-24T09:00:00Z", reject_reason: "", cancel_reason: "Task rescheduled", datetime_from: "2025-11-16T09:00:00Z", datetime_to: "2025-11-16T18:00:00Z" },
  { request_id: "REQ022", employee_id: "EMP1022", employee_name: "Megha R", leave_type: "Casual Leave (CL)", status: "Approved", description: "Personal work", report_to: "Karthik M", created_at: "2025-10-24T09:20:00Z", updated_at: "2025-10-24T10:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-17T09:00:00Z", datetime_to: "2025-11-18T18:00:00Z" },
  { request_id: "REQ023", employee_id: "EMP1023", employee_name: "Sanjay T", leave_type: "Sick Leave (SL)", status: "Pending", description: "Migraine", report_to: "Nisha R", created_at: "2025-10-25T08:15:00Z", updated_at: "2025-10-25T08:15:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-19T09:00:00Z", datetime_to: "2025-11-20T18:00:00Z" },
  { request_id: "REQ024", employee_id: "EMP1024", employee_name: "Radha K", leave_type: "Others", status: "Approved", description: "Family vacation", report_to: "Arun V", created_at: "2025-10-26T10:05:00Z", updated_at: "2025-10-26T11:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-21T09:00:00Z", datetime_to: "2025-11-25T18:00:00Z" },
  { request_id: "REQ025", employee_id: "EMP1025", employee_name: "Manoj P", leave_type: "Others", status: "Approved", description: "Worked on holiday", report_to: "Abirami C", created_at: "2025-10-27T07:40:00Z", updated_at: "2025-10-27T08:00:00Z", reject_reason: "", cancel_reason: "", datetime_from: "2025-11-26T09:00:00Z", datetime_to: "2025-11-26T18:00:00Z" }
];




export const Auth: React.FC = () => {

          const [myList] = useState<string[]>(["Employee", "Manager", "Admin"]);
          const [timeLine, setTimeLine] = useState<string>("Employee");
           const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
 
  const navigate = useNavigate();


  const { empdetail, setEmpdetail, setEmployeeRole, setTrackRequest, setProjectLeadApprovalRequestData } = useContext(locateContext);
  useEffect(() => {

          setEmpdetail({
        ...empdetail,
        employee_id: "E123",
        employee_name: "Abinas Chinnasamy",
        reports_to: "managerA@example.com",
        image: "https://res.cloudinary.com/dababspdo/image/upload/v1759703863/dummyphoto_ihmuef.jpg",
      });

      setTrackRequest(leaveRequests);
    
      // setQualityApprovalRequestData(packagingRequests);
    
      // setPackagingApprovalRequestData(packagingRequests);
    
      // setInventoryApprovalRequestData(packagingRequests);
    
      setProjectLeadApprovalRequestData(leaveRequests);
    
  
      // setPackerLeadApprovalRequestData(packagingRequests);
    
    }, []); 

  

  // if (isLoading) return <div>loading...</div>;

  // render user
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "space-between  ",
flexDirection: isPortrait ? "column" : "row",
      gap: "10px",
    }}>
<div 
style={{
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop:"50px"
}}>
  <h2>
    Explore By
  </h2>
  <div>

   <FormControl  >
                  <InputLabel id="periods">Role</InputLabel>
                  <Select
                    labelId="periods"
                    id="periods-select"
                    value={timeLine}
                    onChange={(event) => setTimeLine(event.target.value)}
                    label="Periods"
                  >
                    {myList.map(option => (
                      <MenuItem className ="menuItemoption" key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                  </div>
<button 
style={{
width: "100px",
height: "40px",
cursor: "pointer",
}}
                        onClick={() => {setEmployeeRole(timeLine); navigate("/payroll")}}
>
  Login
</button>


      
   

</div>
<div style={{
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width:"15vw",
  gap: "20px",
  marginTop:"50px"
}}>

</div>
  
                   </div>
  );
};