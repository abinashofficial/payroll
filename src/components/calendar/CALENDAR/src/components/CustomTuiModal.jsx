import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Modal } from "reactstrap";

import DateRangePicker from "./DateRangePicker";

export default function CustomTuiModal({
  isOpen = false,
  toggle,
  onSubmit,
  submitText = "Save",
  calendars = [],
  attendees = [],
  schedule,
  startDate,
  endDate,
}) {
  const [openSelectCalendars, setOpenSelectCalendars] = useState(false);
  const [openSelectAttendees, setOpenSelectAttendees] = useState(false);
  const wrapperSelectCalendarsRef = useRef(null);
  const wrapperSelectAttendeesRef = useRef(null);
  const dateRangePickerRef = useRef(null);
  const subjectRef = useRef(null);

  const [calendarId, setCalendarId] = useState(calendars[0].id);
  const [attendeeId, setAttendeeId] = useState(attendees[0].id);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleClick = (e) => {
    if (wrapperSelectCalendarsRef.current?.contains(e.target)) {
      // inside click
      // console.log("inside");
      return;
    }
    if (wrapperSelectAttendeesRef.current?.contains(e.target)) {
      // inside click
      // console.log("inside");
      return;
    }
    // outside click
    // ... do whatever on click outside here ...
    // console.log("outside");
    setOpenSelectCalendars(false);
    setOpenSelectAttendees(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);

    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  });

  
  function reset() {
    setCalendarId(calendars[0].id);
    setAttendeeId(attendees[0].id);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    dateRangePickerRef.current.setStartDate(new Date());
    dateRangePickerRef.current.setEndDate(new Date());
  }

  return (
       <></>
  );
}
