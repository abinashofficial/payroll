import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type {  blockedDaysType, ShowMonths} from "./../types";
import { daysOfTheWeek, daysOfTheWeekOffset, getMonthName } from "./../Utils";
import { Dialog } from "@mui/material";

dayjs.extend(isBetween);

interface YearProps {
  activeYear: number;
  showNumberOfMonths?: ShowMonths;
  bookedDates: blockedDaysType;
  dateswithEvent?: any[]; // replace `any` with the proper type if you have it
  lateCheckouts?: any[];  // replace `any` with the proper type
  monthsFrom?: number;
}

const Year: React.FC<YearProps> = ({
  activeYear,
  showNumberOfMonths = 12,
  bookedDates,
  dateswithEvent = [],
  lateCheckouts = [],
  monthsFrom = 1,
}) => {
  const _year = activeYear || dayjs().year();
  const [open, setOpen] = useState(false);
  const [ent, setevt] = useState([]);
  const handleClose = () => setOpen(false);
  console.log(dateswithEvent)

  const hasEvent = (isLateCheckout : any, selectedDate : any) => {
    let index = isLateCheckout.findIndex((a:any) => a.to === selectedDate);
    if (index !== -1) {
      setOpen(true);
      setevt(isLateCheckout?.[index]?.events);
    }
  };

  return (
    <>
      <div className="year" data-testid="year">
        {new Array(showNumberOfMonths).fill("").map((_, pos) => {
          const arrOffset = 1;
          const month = monthsFrom + pos;
          const date = `${_year}-${month}`;
          const monthName = getMonthName(month);
          const totalDays = dayjs(date).daysInMonth();
          const firstDayOfWeek = dayjs(`${date}-01`).day();

          const offsetDays =
            firstDayOfWeek !== 0
              ? new Array(firstDayOfWeek - arrOffset).fill("")
              : new Array(Number(daysOfTheWeekOffset[firstDayOfWeek])).fill("");

          const daysArr = new Array(totalDays).fill("");

          return (
            <div key={pos} className="month" data-testid="month">
              <h3 className="monthName">{monthName}</h3>

              <div className="content dayOfTheWeek">
                {daysOfTheWeek.map((dayOfTheWeek, pos) => {
                  return (
                    <div key={pos} className="day">
                      {dayOfTheWeek}
                    </div>
                  );
                })}
              </div>

              <div className="content">
                {offsetDays.map((_, pos) => {
                  return <div key={pos} className="day" />;
                })}

                {daysArr.map((_, pos) => {
                  const day = pos + arrOffset;
                  const _date = `${month}-${day}-${_year}`;

                  const isBooked = Array.isArray(bookedDates)
                    ? bookedDates.includes(_date)
                    : false;

                  const isLateCheckout =
                    Array.isArray(lateCheckouts) &&
                    lateCheckouts.findIndex((a) => a.to === _date) !== -1;

                  return (
                    <div
                      onClick={() => hasEvent(lateCheckouts, _date)}
                      key={pos}
                      className={`day ${isBooked ? "booked" : ""} ${
                        isLateCheckout ? "isLateCheckout" : ""
                      }`}
                    >
                      <span>{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Dialog onClose={handleClose} open={open}>
        {(ent || []).map((e: any) => (
          <div>
            <p>{e.time}</p>
            <p>{e.activity}</p>
          </div>
        ))}
      </Dialog>
    </>
  );
};

export default Year;
