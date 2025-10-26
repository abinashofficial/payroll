export type BookingType = {
  from: string | Date
  to: string | Date
  middayCheckout?: boolean
  events?:evtObj[]
}
export type evtObj = {
  time: string 
  activity: string 
  
}

export type blockedDaysType = string[]

export type ShowMonths = 12 | 4 | 2 | 1

export interface ICalendarPropTypes {
  bookings?: BookingType[]
  showNumberOfMonths?: ShowMonths
  showKey?: boolean
  showCurrentYear?: boolean
  showControls?: boolean
}

export interface IHandleBookings {
  bookings: BookingType[]
  year: number
}

export interface IFormatBookingsData {
  bookings: BookingType[]
  year: number
}

export interface IGetAllBookedDays {
  dates: BookingType[]
}

export interface IGetAllHalfDays {
  dates: BookingType[]
}

export interface IGetDatesInRange {
  startDate: string | Date
  endDate: string | Date
}

export interface IControls {
  prev: () => void
  initCal: () => void
  next: () => void
}

// types.ts
export const Days = {
  Monday: "M",
  Tusday: "T",
  Wednesday: "W",
  Thursday: "T",
  Friday: "F",
  Saturday: "S",
  Sunday: "S",
} as const;

export type Days = typeof Days[keyof typeof Days];

export type DaysOfWeekType = Days[]

// types.ts
export const DayOffset = {
  Monday: "6",
  Tusday: "5",
  Wednesday: "4",
  Thursday: "3",
  Friday: "2",
  Saturday: "1",
  Sunday: "0",
} as const;

// Type for DayOffset values
export type DayOffset = typeof DayOffset[keyof typeof DayOffset];

export type DaysOfWeekOffsetType = DayOffset[]

export interface IYear {
  showNumberOfMonths?: ShowMonths
  bookedDates: blockedDaysType
  lateCheckouts: blockedDaysType
  activeYear: number
  monthsFrom: number
}

export interface IGetMonthName {
  [key: number]: string
}
