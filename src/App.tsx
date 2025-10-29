import { useState, createContext, useEffect } from 'react'

import "./App.css";
import "./components/stepper/Stepper.css"
import "./style/mystyle.css";
import "./pages/landing_page/LandingPage.css";
import "./style/animation.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import SideBar from "./components/SideBar.tsx";
import ScrollToTop from "./components/scrolltotop.tsx";
import Calendar from "./components/calendar/CALENDAR/src/Calendar.jsx";
import { Auth } from "./Auth.tsx";
import { UserTrackRequest } from "./pages/track_req/UserTrackReq.tsx"
// import LandingPage from "./pages/landing_page/LandingPage.tsx";
import { Payslip } from './pages/payslip.tsx';
import OverAllDashboardRequest from "./pages/dashboard/OverAllDashboard";
import "./pages/track_req/CommonTrackReq.css"
import CheckInOut from './pages/checkIn.tsx'
import EmployeeCheckInOut from './pages/companyDetails.tsx'
import {ManagerTrackRequest} from './pages/track_req/managerTrackReq.tsx';
import "./pages/raise-req/CommonDrawer.css"









interface CompanyDetails {
  name: string;
  email: string;
  logo: string | null;
  branch: string;
  location: Location | null;
}



export const locateContext = createContext<any>({});

function App() {
    const [darkMode, setDarkMode] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [empdetail, setEmpdetail] = useState({
    employee_id: "",
    employee_name: "",
    user_id: "",
    reports_to: "",
  });
    const [company, setCompany] = useState<CompanyDetails>({
      name: "",
      email: "",
      logo: null,
      branch: "",
      location: null,
    });
    const [data, setData] = useState([

]);

  const [selectedBar, setSelectedBar] = useState("Common");
  const [employeeRole, setEmployeeRole] = useState("");
  const [trackrequest, setTrackRequest] = useState([]);
  const [approvalRequest, setApprovalRequest] = useState([]);
  const [projectLeadApprovalRequestData, setProjectLeadApprovalRequestData] = useState([]);


  const [drawer, setDrawer] = useState(false);
  const [editRequestStatus, setEditRequestStatus] = useState("");
  const [searchFilter, setSearchFilter] = useState("");



  const toggleMenu = () => {
    setIsOpenMenu((prevMenuState) => !prevMenuState);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store the dark mode state in localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };



  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      const parsedDarkMode = JSON.parse(storedDarkMode);
      setDarkMode(parsedDarkMode);
    }
  }, []);

  return (
<BrowserRouter>
      <ScrollToTop />

      <locateContext.Provider
          value={{
            empdetail: empdetail,
            setEmpdetail: setEmpdetail,
            company:company,
            setCompany:setCompany,
            selectedBar: selectedBar,
            setSelectedBar: setSelectedBar,
            employeeRole: employeeRole,
            setEmployeeRole: setEmployeeRole,
            darkMode:darkMode,
            setDarkMode: setDarkMode,
            trackrequest:trackrequest,
            setTrackRequest:setTrackRequest,
            approvalRequest:approvalRequest,
            setApprovalRequest:setApprovalRequest,
            drawer:drawer,
            setDrawer:setDrawer,
            editRequestStatus:editRequestStatus,
            setEditRequestStatus:setEditRequestStatus,
            searchFilter:searchFilter,
            setSearchFilter:setSearchFilter,
            projectLeadApprovalRequestData:projectLeadApprovalRequestData,
            setProjectLeadApprovalRequestData:setProjectLeadApprovalRequestData,
            data:data,
            setData:setData,
          }}
        >
          {/* <Service/> */}
{employeeRole&& (
        <Header
          darkMode={darkMode}
          isOpenMenu={isOpenMenu}
          toggleDarkMode={toggleDarkMode}
        />        
)}

        <SideBar
          darkMode={darkMode}
          isOpenMenu={isOpenMenu}
          toggleMenu={toggleMenu}
        >



      
          <Routes>
            {/* <Route path="/payroll" element={<LandingPage/>} />' */}

            <Route path="/" element={<Auth />} /> 
            <Route path="/payroll/trackreq" element={<UserTrackRequest />} />
                        <Route path="/payroll/managerreq" element={<ManagerTrackRequest />} />


            <Route path="/payroll/calendar" element={<Calendar/>} />
                        <Route path="/payroll/payslip" element={<Payslip/>} />
                                    <Route path="/payroll" element={<OverAllDashboardRequest/>} />
                                    <Route path="/payroll/checkin" element={<CheckInOut/>} />

                                    <Route path="payroll/company" element={<EmployeeCheckInOut/>} />


          </Routes>
        </SideBar>


        
        </locateContext.Provider>
      </BrowserRouter>
  )
}

export default App
