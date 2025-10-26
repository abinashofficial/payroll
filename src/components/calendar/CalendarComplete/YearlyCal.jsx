import React, { useEffect, useState, useContext } from "react";
import "./year.css";
import Calendar from "../CalendarYear/components/Calendar";
// import { useFrappeGetDocList } from "frappe-react-sdk";
// import "../CALENDAR/src/components/calendar2.css";
import locateContext from "../../../App";
export default function Yearly(props) {
  const { role } = useContext(locateContext) || {
    role: "",
    setRole: () => {},
  };

  // Define filter options based on the user's role
  let filterOptions = [];
  if (role === "personnel") {
    filterOptions = [
      "Department Head Approved",
      "Department Head Rejected",
      "Pending",
      "Safety Head Approved",
      "Safety Head Rejected",
      "Project Lead Approved",
      "Project Lead Rejected",
      "Job Done",
    ];
  }

  if (role === "department") {
    filterOptions = [
      "Department Head Approved",
      "Department Head Rejected",
      "Pending",
    ];
  }
  if (role === "safetyhead") {
    filterOptions = ["Safety Head Approved", "Safety Head Rejected", "Pending"];
  }
  if (role === "projectlead") {
    filterOptions = [
      "Project Lead Approved",
      "Project Lead Rejected",
      "Pending",
    ];
  }

const data = [
  {
    request_type: "Fire Safety Check",
    dashboard_permit_date: "2025-10-20",
    start_time: "09:00",
    request_status: "Pending",
    employee_id: "E001",
  },
  {
    request_type: "Electrical Inspection",
    dashboard_permit_date: "2025-10-21",
    start_time: "10:30",
    request_status: "Department Lead Approved",
    employee_id: "E002",
  },
  {
    request_type: "Lifting Equipment Check",
    dashboard_permit_date: "2025-10-22",
    start_time: "14:00",
    request_status: "HR Admin Approved",
    employee_id: "E003",
  },
  {
    request_type: "Gas Cylinder Audit",
    dashboard_permit_date: "2025-10-23",
    start_time: "11:00",
    request_status: "Project Lead Rejected",
    employee_id: "E004",
  },
  {
    request_type: "Chemical Storage Inspection",
    dashboard_permit_date: "2025-10-24",
    start_time: "08:30",
    request_status: "Pending",
    employee_id: "E005",
  },
  {
    request_type: "Machine Guarding Check",
    dashboard_permit_date: "2025-10-25",
    start_time: "13:00",
    request_status: "Department Lead Rejected",
    employee_id: "E006",
  },
];



  // State to hold the bookings data
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Group data by month and day
      const groupedData = data.reduce((acc, item) => {
        const date = new Date(item.dashboard_permit_date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const day = date.getDate();

        if (!acc[monthYear]) {
          acc[monthYear] = {};
        }

        if (!acc[monthYear][day]) {
          acc[monthYear][day] = [];
        }

        acc[monthYear][day].push(item);

        return acc;
      }, {});

      // Process the grouped data and calculate daily counts for each request type
      const processedBookings = [];
      for (const monthYear in groupedData) {
        for (const day in groupedData[monthYear]) {
          const requestTypeCounts = {};

          groupedData[monthYear][day].forEach((item) => {
            const requestType = item.request_type.trim();
            const requestStatus = item.request_status.trim();
            const key = `${requestType}_${requestStatus}`;

            if (!requestTypeCounts[key]) {
              requestTypeCounts[key] = 1;
            } else {
              requestTypeCounts[key]++;
            }
          });

          const sortedRequestTypes = Object.keys(requestTypeCounts).sort(
            (a, b) => requestTypeCounts[b] - requestTypeCounts[a]
          );

          processedBookings.push({
            from: new Date(`${monthYear}-${day}`),
            to: new Date(`${monthYear}-${day}`),
            events: sortedRequestTypes.map((key) => {
              const [requestType, requestStatus] = key.split("_");
              return {
                activity: (
                  <div
                    className="tui-full-calendar-popup-detail tui-full-calendar-popup-container"
                    style={{ margin: "10px", borderRadius: "10px" }}
                  >
                    {console.log("Request Status:", requestStatus)}
                    {requestType} - {requestStatus}: {requestTypeCounts[key]}
                  </div>
                ),
              };
            }),
            middayCheckout: true,
          });
        }
      }

      setBookings(processedBookings);
    }
  }, [data]);

  return <Calendar {...props} bookings={bookings} />;
}
