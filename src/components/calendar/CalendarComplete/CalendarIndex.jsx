import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Year from "./CalendarView";

const localizer = momentLocalizer(moment);

export const CalendarIndex = (props) => (
  <div>
    <Year date={new Date()} />
  </div>
);
