import React, { useState, useRef, useEffect } from "react";

import "./calendar.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";
// import { useFrappeGetDocList } from "frappe-react-sdk";
import locateContext from "../../../../App";
import { useContext } from "react";
export default function App() {
  const { role, setRole } = useContext(locateContext) || {
    role: "",
    setRole: () => {},
  };
  console.log("role........", role);
  let filterOptions = [];

  if (role === "hruser") {
    filterOptions = [
      "Department Lead Approved",
      "Department Lead Rejected",
      "Pending",
      "HR Admin Approved",
      "HR Admin Rejected",
      "Project Lead Approved",
      "Project Lead Rejected",
      "Job Done",
    ];
  }

  if (role === "department") {
    filterOptions = [
      "Department Lead Approved",
      "Department Lead Rejected",
      "Pending",
    ];
  }
  if (role === "hradmin") {
    filterOptions = ["HR Admin Approved", "HR Admin Rejected", "Pending"];
  }
  if (role === "projectlead") {
    filterOptions = [
      "Project Lead Approved",
      "Project Lead Rejected",
      "Pending",
    ];
  }
  if (role === "employee") {
    filterOptions = ["Pending"];
  }
  // const { data } = useFrappeGetDocList("Payroll_Raise_Request", {
  //   fields: ["request_type", "dashboard_date", "start_time", "request_status"],
  //   filters: [
  //     ["request_status", "IN", filterOptions.length > 0 ? filterOptions : null],
  //   ],

  //   limit: 100000,

  //   orderBy: {
  //     field: "creation",
  //     order: "desc",
  //   },
  // });

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
  console.log("calendar data payrole", data);

  const attendees = [
    {
      id: "1", 
      name: "Chin",
    },
    { id: "2", name: "Narashimman" },
    { id: "3", name: "Linh" },
    { id: "4", name: "Hai" },
  ];
  const schedules = [];

  const colors = [
    {
      id: "1",
      color: "#ffffff",
      bgColor: "#34C38F",
      dragBgColor: "#34C38F",
      borderColor: "#34C38F",
    },
    {
      id: "2",
      color: "#ffffff",
      bgColor: "#F4696A",
      dragBgColor: "#F4696A",
      borderColor: "#F4696A",
    },
    {
      id: "3",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
    {
      id: "4",
      color: "#ffffff",
      bgColor: "#F2B34C",
      dragBgColor: "#F2B34C",
      borderColor: "#F2B34C",
    },
    {
      id: "5",
      color: "#ffffff",
      bgColor: "#74788D",
      dragBgColor: "#74788D",
      borderColor: "#74788D",
    },
    {
      id: "6",
      color: "#ffffff",
      bgColor: "#343A40",
      dragBgColor: "#343A40",
      borderColor: "#343A40",
    },
    {
      id: "7",
      color: "#000000",
      bgColor: "#FFFFFF",
      dragBgColor: "#FFFFFF",
      borderColor: "#FFFFFF",
    },
  ];

  const calendars = [
    {
      id: "1",
      name: "BPA Technical",
    },
    {
      id: "2",
      name: "Aqua 2 Cleaning",
    },
    {
      id: "3",
      name: "Aqua 4 Cleaning",
    },
    {
      id: "4",
      name: "Luxury 6 Cleaning",
    },
    {
      id: "5",
      name: "Luxury 6 Management",
    },
    {
      id: "6",
      name: "Aqua 3 Management",
    },
    {
      id: "7",
      name: "Aqua 2 Management",
    },
  ];

  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    // console.log('onBeforeCreateSchedule', event)
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    // call api
    const result = true;

    if (result) {
      const newSchedule = {
        ...event,
        id: schedules.length,
        title: newEvent.title,
        calendarId: newEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: newEvent.attendees,
        isVisible: true,
        start: newEvent.start,
        end: newEvent.end,

        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: event.location,

        state: event.state,
        body: event.body,
      };

      childRef.current.createSchedule(newSchedule);
      setModal(false);
    }
  }

  function onBeforeUpdateSchedule(event) {
    // console.log('onBeforeUpdateSchedule', event)

    const { schedule, changes } = event;

    // resize & drag n drop
    if (changes) {
      // call api
      const result = true;
      if (result) {
        return childRef.current.updateSchedule(schedule, changes);
      }
    }

    setModal(true);
    setEvent(event);
  }
  function formatDate(dateString, timeString) {
    if (dateString && timeString) {
      // Extracting year, month, and day from the dateString
      const [year, month, day] = dateString.split("-").map(Number);

      // Extracting hours and minutes from the timeString
      const [time, meridiem] = timeString.split(/(?= [AP]M)/i);
      const [hours, minutes] = time.split(":").map(Number);

      // Adjusting hours for PM
      let adjustedHours = hours;
      if (meridiem === " PM" && hours < 12) {
        adjustedHours += 12;
      }

      // Creating Date object
      const formattedDate = new Date(
        year,
        month - 1,
        day,
        adjustedHours,
        minutes
      );
      return formattedDate;
    }
  }

  async function fetchData() {
    try {
      if (data && data.length > 0) {
        // Calculate counts for each request type
        const requestTypeCountsInEachDate = {};
        data.forEach((item) => {
          const createdDate =
            // formatDate(item.dashboard_date, item.start_time) || null;
            item.dashboard_date || null;
          const requestType = item?.request_type.trim() || null;
          const requestStatus = item?.request_status?.trim() || null;
          const combinedReqAndStuts = `${requestType}_${requestStatus}`;
          if (createdDate && requestType) {
            requestTypeCountsInEachDate[createdDate] =
              requestTypeCountsInEachDate[createdDate] || {};

            // Retrieve the count for the specific requestType within the createdDate, if it exists, otherwise initialize it to 0
            requestTypeCountsInEachDate[createdDate][combinedReqAndStuts] =
              requestTypeCountsInEachDate[createdDate][combinedReqAndStuts] ||
              0;

            // Increment the count for the specific requestType within the createdDate by 1
            requestTypeCountsInEachDate[createdDate][combinedReqAndStuts]++;
          }
        });

        // // Create schedules with unique request types
        // const uniqueRequestTypes = Array.from(
        //   new Set(data.map((item) => item.request_type.trim()))
        // );
        const newSchedules = [];
        for (let Dates in requestTypeCountsInEachDate) {
          Object.keys(requestTypeCountsInEachDate[Dates]).map(
            (requestType, index) => {
              const count = requestTypeCountsInEachDate[Dates][requestType];
              const item = data.find((item) => item.dashboard_date == Dates);
              let obj = {
                ...item,
                id: index.toString(), // You should use a unique identifier here
                title: `${requestType} - ${count}`, // Include count in title
                calendarId: (index % calendars.length) + 1, // Adjust based on your calendar logic
                category: "time",
                attendees: [item.employee_id || "Unknown"],
                isVisible: true,
                start: formatDate(item.dashboard_date, item.start_time),
                end: formatDate(item.dashboard_date, item.start_time),
              };
              newSchedules.push(obj);
            }
          );
        }

        // Create schedules
        for (const newSchedule of newSchedules) {
          await childRef.current.createSchedule(newSchedule);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [data]);

  async function handleUpdateSchedule(updateEvent) {
    const result = true;

    if (result) {
      const { schedule } = event;

      await childRef.current.deleteSchedule(schedule);

      const newSchedule = {
        ...event,
        id: schedules.length + 2,
        title: updateEvent.title,
        calendarId: updateEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: updateEvent.attendees,
        isVisible: true,
        start: updateEvent.start,
        end: updateEvent.end,

        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: event.location,

        state: event.state,
        body: event.body,
      };

      await childRef.current.createSchedule(newSchedule);

      setModal(false);
    }
  }

  function onBeforeDeleteSchedule(event) {
    // console.log('onBeforeDeleteSchedule', event)

    // call api
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <div>
      <div className="calCon1">
        <div className="calCon2">
          <div>
            <CustomTuiCalendar
              ref={childRef}
              {...{
                isReadOnly: true,
                showSlidebar: true,
                showMenu: true,
                useCreationPopup: false,

                calendars: formatCalendars,
                schedules,
                onBeforeCreateSchedule,
                onBeforeUpdateSchedule,
                onBeforeDeleteSchedule,
              }}
            />
            <CustomTuiModal
              {...{
                isOpen: modal,
                toggle,
                onSubmit:
                  event?.triggerEventName === "mouseup"
                    ? handleCreateSchedule
                    : handleUpdateSchedule,
                submitText:
                  event?.triggerEventName === "mouseup" ? "Save" : "Update",
                calendars: formatCalendars,
                attendees,
                schedule: event?.schedule,
                startDate: event?.start,
                endDate: event?.end,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
