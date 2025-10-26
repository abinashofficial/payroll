import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import TuiCalendar from "tui-calendar";
import moment from "moment";

import "tui-calendar/dist/tui-calendar.css";
import { useNavigate } from "react-router-dom";

// import "../components/calendar2.css";
import { Link } from "react-router-dom";
import Yearly from "../../../CalendarComplete/YearlyCal";
import { Grid } from "@mui/material";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CustomTuiCalendar = forwardRef(
  (
    {
      height = "800px",
      defaultView = "week",
      calendars = [],
      schedules = [],
      isReadOnly = true,
      showSlidebar = false,
      showMenu = false,
      onCreate,
      createText = "New schedule",
      onBeforeCreateSchedule = () => false,
      onBeforeUpdateSchedule = () => false,
      onBeforeDeleteSchedule = () => false,
      ...rest
    },
    ref
  ) => {
    const calendarInstRef = useRef(null);
    const tuiRef = useRef(null);
    const wrapperRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isYear, setIsYear] = useState(false);
    const [renderRange, setRenderRange] = useState("");
    const [workweek, setWorkweek] = useState(true);
    const [narrowWeekend, setNarrowWeekend] = useState(true);
    const [startDayOfWeek, setStartDayOfWeek] = useState(1);
    const [type, setType] = useState("Weekly");
    const [checkedCalendars, setCheckedCalendars] = useState(
      calendars.map((element) => ({ ...element, isChecked: true }))
    );
    const [filterSchedules, setFilterSchedules] = useState(schedules);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateArray = renderRange.split(".");
    const year = dateArray[0];
    const monthIndex = parseInt(dateArray[1], 10) - 1; // Subtract 1 because JavaScript months are zero-based
    const month = months[monthIndex];
    const day = dateArray[2];
    const formattedDate = `${month} ${year}`;
    useImperativeHandle(ref, () => ({
      getAlert() {
        alert("getAlert from Child");
      },
      createSchedule,
      updateSchedule,
      deleteSchedule,
    }));
    // document
    //   .getElementsByClassName("tui-full-calendar-floating-layer")
    //   .addEventListener();

    useEffect(
      () => {
        calendarInstRef.current = new TuiCalendar(tuiRef.current, {
          useDetailPopup: true,
          useCreationPopup: true,
          template: {
            milestone: function (schedule) {
              return (
                '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
                schedule.bgColor +
                '">' +
                schedule.title +
                "</span>"
              );
            },
            milestoneTitle: function () {
              return '<span class="tui-full-calendar-left-content">MILESTONE</span>';
            },
            task: function (schedule) {
              return "#" + schedule.title;
            },
            taskTitle: function () {
              return '<span class="tui-full-calendar-left-content">TASK</span>';
            },
            allday: function (schedule) {
              return _getTimeTemplate(schedule, true);
            },
            alldayTitle: function () {
              return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
            },
            time: function (schedule) {
              return _getTimeTemplate(schedule, false);
            },
            goingDuration: function (schedule) {
              return (
                '<span class="calendar-icon ic-travel-time"></span>' +
                schedule.goingDuration +
                "min."
              );
            },
            comingDuration: function (schedule) {
              return (
                '<span class="calendar-icon ic-travel-time"></span>' +
                schedule.comingDuration +
                "min."
              );
            },
            monthMoreTitleDate: function (date, dayname) {
              var day = date.split(".")[2];

              return (
                '<span class="tui-full-calendar-month-more-title-daZy">' +
                day +
                '</span> <span class="tui-full-calendar-month-more-title-day-label">' +
                dayname +
                "</span>"
              );
            },
            monthMoreClose: function () {
              return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
            },
            monthGridHeader: function (dayModel) {
              var date = parseInt(dayModel.date.split("-")[2], 10);
              var classNames = ["tui-full-calendar-weekday-grid-date "];

              if (dayModel.isToday) {
                classNames.push(
                  "tui-full-calendar-weekday-grid-date-decorator"
                );
              }

              return (
                '<span class="' + classNames.join(" ") + '">' + date + "</span>"
              );
            },
            monthGridHeaderExceed: function (hiddenSchedules) {
              return (
                '<span class="weekday-grid-more-schedules">+' +
                hiddenSchedules +
                "</span>"
              );
            },
            monthGridFooter: function () {
              return "";
            },
            monthGridFooterExceed: function (hiddenSchedules) {
              return "";
            },
            monthDayname: function (model) {
              return model.label.toString().toLocaleUpperCase();
            },
            weekDayname: function (model) {
              return (
                '<span class="tui-full-calendar-dayname-date">' +
                model.date +
                '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' +
                model.dayName +
                "</span>"
              );
            },
            weekGridFooterExceed: function (hiddenSchedules) {
              return "+" + hiddenSchedules;
            },
            dayGridTitle: function (viewName) {
              var title = "";
              switch (viewName) {
                case "milestone":
                  title =
                    '<span class="tui-full-calendar-left-content">MILESTONE</span>';
                  break;
                case "task":
                  title =
                    '<span class="tui-full-calendar-left-content">TASK</span>';
                  break;
                case "allday":
                  title =
                    '<span class="tui-full-calendar-left-content">ALL DAY</span>';
                  break;
                default:
                  break;
              }

              return title;
            },

            collapseBtnTitle: function () {
              return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
            },

            timegridDisplayPrimayTime: function (time) {
              // will be deprecated. use 'timegridDisplayPrimaryTime'
              var meridiem = "am";
              var hour = time.hour;

              if (time.hour > 12) {
                meridiem = "pm";
                hour = time.hour - 12;
              }

              return hour + " " + meridiem;
            },
            timegridDisplayPrimaryTime: function (time) {
              var meridiem = "am";
              var hour = time.hour;

              if (time.hour > 12) {
                meridiem = "pm";
                hour = time.hour - 12;
              }

              return hour + " " + meridiem;
            },

            timegridCurrentTime: function (timezone) {
              var templates = [];

              if (timezone.dateDifference) {
                templates.push(
                  "[" +
                    timezone.dateDifferenceSign +
                    timezone.dateDifference +
                    "]<br>"
                );
              }

              templates.push(moment(timezone.hourmarker).format("HH:mm a"));

              return templates.join("");
            },
            popupIsAllDay: function () {
              return "All Day";
            },
            popupStateFree: function () {
              return "Free";
            },
            popupStateBusy: function () {
              return "Busy";
            },
            titlePlaceholder: function () {
              return "Subject";
            },
            locationPlaceholder: function () {
              return "Location";
            },
            startDatePlaceholder: function () {
              return "Start date";
            },
            endDatePlaceholder: function () {
              return "End date";
            },
            popupSave: function () {
              return "Save";
            },
            popupUpdate: function () {
              return "Update";
            },
            popupDetailDate: function (isAllDay, start, end) {
              var isSameDate = moment(start).isSame(end);
              var endFormat = (isSameDate ? "" : "YYYY/MM/DD ") + "HH:mm";

              if (isAllDay) {
                return (
                  moment(start).format("YYYY/MM/DD") +
                  (isSameDate ? "" : " - " + moment(end).format("YYYY/MM/DD"))
                );
              }

              return (
                moment(start.toDate()).format("YYYY/MM/DD HH:mm") +
                " - " +
                moment(end.toDate()).format(endFormat)
              );
            },
            popupDetailLocation: function (schedule) {
              return "Location : " + schedule.location;
            },
            // popupDetailUser: function (schedule) {
            // 	return 'Staff : ' + (schedule.attendees || []).join(', ')
            // },
            popupDetailState: function (schedule) {
              return "State : " + schedule.state || "Busy";
            },
            popupDetailRepeat: function (schedule) {
              return "Repeat : " + schedule.recurrenceRule;
            },
            popupDetailBody: function (schedule) {
              return "Body : " + schedule.body;
            },
            popupEdit: function () {
              return "Edit";
            },
            popupDelete: function () {
              return "Delete";
            },
          },

          calendars,
          ...rest,
        });
        setRenderRangeText();
        // render schedules
        calendarInstRef.current.clear();
        calendarInstRef.current.createSchedules(filterSchedules, true);
        calendarInstRef.current.render();

        calendarInstRef.current.on("beforeCreateSchedule", function (event) {
          onBeforeCreateSchedule(event);
        });
        calendarInstRef.current.on("beforeUpdateSchedule", function (event) {
          onBeforeUpdateSchedule(event);
        });
        calendarInstRef.current.on("beforeDeleteSchedule", function (event) {
          onBeforeDeleteSchedule(event);
        });
        calendarInstRef.current.on("clickSchedule", function (event) {});
        calendarInstRef.current.on("clickDayname", function (event) {
          // console.log("clickDayname", event);
          if (calendarInstRef.current.getViewName() === "week") {
            calendarInstRef.current.setDate(new Date(event.date));
            calendarInstRef.current.changeView("day", true);
          }
        });

        calendarInstRef.current.on("clickMore", function (event) {
          // console.log("clickMore", event.date, event.target);
        });

        calendarInstRef.current.on(
          "clickTimezonesCollapseBtn",
          function (timezonesCollapsed) {
            // console.log(timezonesCollapsed);
          }
        );

        calendarInstRef.current.on("afterRenderSchedule", function (event) {
          // var schedule = event.schedule;
          // var element = calendarInstRef.current.getElement(
          //   schedule.id,
          //   schedule.calendarId
          // );
          // use the element
          // console.log(element);
        });

        return () => {
          calendarInstRef.current.destroy();
        };
      },
      // [tuiRef, schedules]
      []
    );
    // useEffect(() => {
    //   document
    //     .getElementsByClassName("tui-full-calendar-weekday-schedule-title")
    //     .addEventListener(
    //       "click",
    //       (event) => (event.target.style.backgroundColor = "red")
    //     );
    // }, []);

    useLayoutEffect(() => {
      // console.log("before render");
    });

    function currentCalendarDate(format) {
      var currentDate = moment([
        calendarInstRef.current.getDate().getFullYear(),
        calendarInstRef.current.getDate().getMonth(),
        calendarInstRef.current.getDate().getDate(),
      ]);

      return currentDate.format(format);
    }

    function setRenderRangeText() {
      var options = calendarInstRef.current.getOptions();
      var viewName = calendarInstRef.current.getViewName();

      var html = [];
      if (viewName === "day") {
        html.push(currentCalendarDate("YYYY.MM.DD"));
      } else if (
        viewName === "month" &&
        (!options.month.visibleWeeksCount ||
          options.month.visibleWeeksCount > 4)
      ) {
        html.push(currentCalendarDate("YYYY.MM"));
      } else {
        html.push(
          moment(calendarInstRef.current.getDateRangeStart().getTime()).format(
            "YYYY.MM.DD"
          )
        );

        html.push(" ~ ");
        html.push(
          moment(calendarInstRef.current.getDateRangeEnd().getTime()).format(
            " MM.DD"
          )
        );
      }
      setRenderRange(html.join(""));
    }

    function _getTimeTemplate(schedule, isAllDay) {
      var html = [];

      if (!isAllDay) {
        html.push(
          "<strong>" +
            moment(schedule.start.toDate()).format("HH:mm") +
            "</strong> "
        );
      }
      if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(" Private");
      } else {
        if (schedule.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b">/span>');
        } else if (schedule.attendees.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(" " + schedule.title);
      }

      return html.join("");
    }

    useEffect(() => {
      document.addEventListener("click", handleClick, false);

      return () => {
        document.removeEventListener("click", handleClick, false);
      };
    });

    const handleClick = (e) => {
      if (wrapperRef.current?.contains(e.target)) {
        // inside click
        // console.log("inside");
        return;
      }

      setOpen(false);
    };

    const handleAllChecked = (event) => {
      const cloneCheckedCalendars = [...checkedCalendars];
      cloneCheckedCalendars.forEach(
        (element) => (element.isChecked = event.target.checked)
      );
      setCheckedCalendars(cloneCheckedCalendars);
      filterCalendar(cloneCheckedCalendars);
    };

    const handleCheckChildElement = (event) => {
      const cloneCheckedCalendars = [...checkedCalendars];
      cloneCheckedCalendars.forEach((element) => {
        if (element.id === event.target.value)
          element.isChecked = event.target.checked;
      });
      setCheckedCalendars(cloneCheckedCalendars);
      filterCalendar(cloneCheckedCalendars);
    };

    const filterCalendar = (cloneCheckedCalendars) => {
      const filterCalendars = cloneCheckedCalendars
        .filter((element) => element.isChecked === false)
        .map((item) => item.id);
      const cloneSchedules = filterSchedules.filter((element) => {
        return filterCalendars.indexOf(element.calendarId) === -1;
      });

      calendarInstRef.current.clear();
      calendarInstRef.current.createSchedules(cloneSchedules, true);
      calendarInstRef.current.render();
    };

    function createSchedule(schedule) {
      console.log("createSchedule");

      calendarInstRef.current.createSchedules([schedule]);
      const cloneFilterSchedules = [...filterSchedules];
      setFilterSchedules((prevState) => [...cloneFilterSchedules, schedule]);
    }

    function updateSchedule(schedule, changes) {
      console.log("updateSchedule");

      calendarInstRef.current.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
      const cloneFilterSchedules = [...filterSchedules];
      setFilterSchedules((prevState) =>
        cloneFilterSchedules.map((item) => {
          if (item.id === schedule.id) {
            return { ...item, ...changes };
          }
          return item;
        })
      );
    }

    function deleteSchedule(schedule) {
      console.log("deleteSchedule");

      calendarInstRef.current.deleteSchedule(schedule.id, schedule.calendarId);
      const cloneFilterSchedules = [...filterSchedules];
      setFilterSchedules((prevState) =>
        cloneFilterSchedules.filter((item) => item.id !== schedule.id)
      );
    }
    var menuItems = {
      display: "flex",
      flexDirection: "left",
      justifyContent: "left",
      alignItems: "center",
      backgroundColor: "#F1F4F1",
      margin: "2px",
      borderRadius: "5px",
    };
    const navigate = useNavigate();

    const ChangeView = () => {
      return (
        <div style={{display:"flex",justifyContent:"space-between",gap:"10px"}}>
          {/* Daily Button */}
          <button
            // className="btn btn-default btn-sm"
            type="button"
            onClick={() => {
              calendarInstRef.current.changeView("day", true);
              setType("Daily");
              setIsYear(false);
            }}
            style={buttonStyle}
          >
            <i className="calendar-icon ic_view_day" />
            Daily
          </button>
    
          {/* Weekly Button */}
          <button
            // className="btn btn-default btn-sm"
            type="button"
            onClick={() => {
              calendarInstRef.current.changeView("week", true);
              setType("Weekly");
              setIsYear(false);
            }}
            style={buttonStyle}
          >
            <i className="calendar-icon ic_view_week" />
            Weekly
          </button>
    
          {/* Monthly Button */}
          <button
            // className="btn btn-default btn-sm"
            type="button"
            onClick={() => {
              calendarInstRef.current.setOptions({ month: { visibleWeeksCount: 4 } }, true);
              calendarInstRef.current.changeView("month", true);
              setType("Month");
              setIsYear(false);
            }}
            style={buttonStyle}
          >
            <i className="calendar-icon ic_view_month" />
            Monthly
          </button>
    
          {/* Yearly Button */}
          {/* <button
            // className="btn btn-default btn-sm"
            type="button"
            onClick={() => {
              setType("Year");
              setIsYear(true);
            }}
            style={buttonStyle}
          >
            <i className="calendar-icon ic_view_year" />
            Yearly
          </button> */}
        </div>
      );
    };
    
    const buttonStyle = {
      
      fontWeight: "900",
      width: "100.7px",
      height: "2.876rem",
      fontSize: "larger",
      borderRadius: "5px",
      backgroundColor: "#4D8C52",
      color:"#FFFFFF",
      border:"none",
      cursor :"pointer"

      // marginRight: "4px",
    };
    
    

    return (
      <div>
        <div id="right" style={{ left: !showSlidebar && 0 }}>
          {showMenu && !isYear && (
            <div
              id="menu "
              style={{
                // position: "absolute",
                top: "8vh",
                width: "78vw",
                display: "flex",
                gap: "10vw",
                flexDirection: "row-reverse",
                right: "9vw",
                marginTop: "1vh",
              }}
            >
              {ChangeView()}

              <span
                // id="menu-navi"
                style={{
                  display: "flex",
                  gap: "30px",
                  width: "1500.7px",
                }}
              >
<Grid
  container
  spacing={1}
  alignItems="left"
  flexWrap="nowrap"
  paddingBottom={2}
>
  <Grid size={{ xs: 6, sm: 3, md: 2, lg: 2, xl: 1 }} style={{ flexGrow: 1, maxWidth: "6%" }}>
    <button
      type="button"
      className="btn btn-default btn-sm move-day"
      style={{
        marginRight: "10px",
        display: "flex",
        alignItems: "left",
        backgroundColor: "#F1F4F1",
        height: "1.876rem",
        marginTop: "1vh",
        cursor: "pointer",
      }}
      data-action="move-prev"
      onClick={() => {
        calendarInstRef.current.prev();
        setRenderRangeText();
      }}
    >
      <MdKeyboardArrowLeft size={20} />
    </button>
  </Grid>

  <Grid size={{ xs: 6, sm: 3, md: 5, lg: 2 }} style={{ flexGrow: 1 }}>
    <span id="renderRange" className="render-range">
      <button
        type="button"
        className="btn btn-default btn-sm move-today"
        style={{
          marginRight: "1px",
          backgroundColor: "#F1F4F1",
          color: "black",
          fontWeight: "900",
          width: "7vw",
          cursor: "pointer",
          fontSize: ".8vw",
          borderRadius: "5px",
          height: "2.876rem",
        }}
      >
        {formattedDate}
      </button>
    </span>
  </Grid>

  <Grid size={{ xs: 6, sm: 3, md: 5, lg: 2 }} style={{ flexGrow: 1 }}>
    <button
      type="button"
      className="btn btn-default btn-sm move-day"
      style={{
        backgroundColor: "#F1F4F1",
        height: "1.876rem",
        marginTop: "1vh",
        color: "black",
        cursor: "pointer",
      }}
      data-action="move-next"
      onClick={() => {
        calendarInstRef.current.next();
        setRenderRangeText();
      }}
    >
      <MdKeyboardArrowRight size={20} />
    </button>
  </Grid>

  <Grid size={{ xs: 6, sm: 3, md: 5, lg: 2 }} style={{ flexGrow: 1 }}>
    <button
      type="button"
      className="btn btn-default btn-sm move-today"
      style={{
        marginRight: "4px",
        backgroundColor: "#F1F4F1",
        color: "black",
        fontWeight: "900",
        width: "160.7px",
        cursor: "pointer",
        fontSize: "larger",
        borderRadius: "5px",
        height: "2.876rem",
      }}
      data-action="move-today"
      onClick={() => {
        calendarInstRef.current.today();
        setRenderRangeText();
      }}
    >
      Today
    </button>
  </Grid>
</Grid>

              </span>
            </div>
          )}

          {isYear && <Yearly ChangeView={ChangeView} />}
          {
            <div
              className={isYear ? "hideEleAndRemFromFlow" : " "}
              style={{ top: "10vh" }}
              ref={tuiRef}
            />
          }
        </div>
      </div>
    );
  }
);

export default CustomTuiCalendar;
