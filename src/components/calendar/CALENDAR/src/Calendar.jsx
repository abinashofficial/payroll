import { useState, useRef, useEffect, useContext } from "react";
import "./calendar.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";
import { locateContext } from "../../../../App";


export default function App() {
  const attendees = [
    { id: "1", name: "Chin" },
    { id: "2", name: "Narashimman" },
    { id: "3", name: "Linh" },
    { id: "4", name: "Hai" },
  ];
      const {data  } = useContext(locateContext);
  

  const schedules = [];

  const colors = [
    { id: "1", color: "#ffffff", bgColor: "#34C38F", dragBgColor: "#34C38F", borderColor: "#34C38F" },
    { id: "2", color: "#ffffff", bgColor: "#F4696A", dragBgColor: "#F4696A", borderColor: "#F4696A" },
    { id: "3", color: "#ffffff", bgColor: "#00a9ff", dragBgColor: "#00a9ff", borderColor: "#00a9ff" },
    { id: "4", color: "#ffffff", bgColor: "#F2B34C", dragBgColor: "#F2B34C", borderColor: "#F2B34C" },
    { id: "5", color: "#ffffff", bgColor: "#74788D", dragBgColor: "#74788D", borderColor: "#74788D" },
    { id: "6", color: "#ffffff", bgColor: "#343A40", dragBgColor: "#343A40", borderColor: "#343A40" },
    { id: "7", color: "#000000", bgColor: "#FFFFFF", dragBgColor: "#FFFFFF", borderColor: "#FFFFFF" },
  ];

  const calendars = [
    { id: "1", name: "BPA Technical" },
    { id: "2", name: "Aqua 2 Cleaning" },
    { id: "3", name: "Aqua 4 Cleaning" },
    { id: "4", name: "Luxury 6 Cleaning" },
    { id: "5", name: "Luxury 6 Management" },
    { id: "6", name: "Aqua 3 Management" },
    { id: "7", name: "Aqua 2 Management" },
  ];

  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
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
    const { schedule, changes } = event;
    if (changes) {
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
      const [year, month, day] = dateString.split("-").map(Number);
      const [time, meridiem] = timeString.split(/(?= [AP]M)/i);
      const [hours, minutes] = time.split(":").map(Number);
      let adjustedHours = hours;
      if (meridiem === " PM" && hours < 12) adjustedHours += 12;
      return new Date(year, month - 1, day, adjustedHours, minutes);
    }
  }

  // const data = [
  //   { request_type: "Fire Safety Check", dashboard_date: "2025-10-20", start_time: "09:00", request_status: "Leave", employee_id: "E001" },
  //   { request_type: "Machine Inspection", dashboard_date: "2025-10-22", start_time: "10:30", request_status: "Present", employee_id: "E002" },
  //   { request_type: "Equipment Audit", dashboard_date: "2025-10-25", start_time: "08:45", request_status: "Absent", employee_id: "E003" },
  // ];

  async function fetchData() {
    try {
      if (data && data.length > 0) {
        const requestTypeCountsInEachDate = {};
        data.forEach((item) => {
          const createdDate = item.dashboard_date || null;
          const requestType = item?.request_type?.trim() || null;
          const requestStatus = item?.request_status?.trim() || null;
          const combinedReqAndStuts = `${requestStatus}`;
          if (createdDate && requestType) {
            requestTypeCountsInEachDate[createdDate] = requestTypeCountsInEachDate[createdDate] || {};
            requestTypeCountsInEachDate[createdDate][combinedReqAndStuts] =
              requestTypeCountsInEachDate[createdDate][combinedReqAndStuts] || 0;
            requestTypeCountsInEachDate[createdDate][combinedReqAndStuts]++;
          }
        });

        const newSchedules = [];
        for (let Dates in requestTypeCountsInEachDate) {
          Object.keys(requestTypeCountsInEachDate[Dates]).forEach((requestType, index) => {
            // const count = requestTypeCountsInEachDate[Dates][requestType];
            const item = data.find((item) => item.dashboard_date === Dates);
            const obj = {
              ...item,
              id: index.toString(),
              // title: `${requestType} - ${count}`,
              title: `${requestType}`,

              calendarId: (index % calendars.length) + 1,
              category: "time",
              attendees: [item.employee_id || "Unknown"],
              isVisible: true,
              start: formatDate(item.dashboard_date, item.start_time),
              end: formatDate(item.dashboard_date, item.end_time),
            };
            newSchedules.push(obj);
          });
        }

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
  }, []);

  function onBeforeDeleteSchedule(event) {
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
              isReadOnly={true}
              showSlidebar={true}
              showMenu={true}
              useCreationPopup={false}
              calendars={formatCalendars}
              schedules={schedules}
              onBeforeCreateSchedule={onBeforeCreateSchedule}
              onBeforeUpdateSchedule={onBeforeUpdateSchedule}
              onBeforeDeleteSchedule={onBeforeDeleteSchedule}
            />
            <CustomTuiModal
              isOpen={modal}
              toggle={toggle}
              onSubmit={event?.triggerEventName === "mouseup" ? handleCreateSchedule : handleCreateSchedule}
              submitText={event?.triggerEventName === "mouseup" ? "Save" : "Update"}
              calendars={formatCalendars}
              attendees={attendees}
              schedule={event?.schedule}
              startDate={event?.start}
              endDate={event?.end}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
