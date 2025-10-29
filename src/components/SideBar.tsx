import React, { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { AiOutlineBars } from "react-icons/ai";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import PackagingList from '@mui/icons-material/ListAltOutlined';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { RaiseRequest } from "../pages/raise-req/RaiseReq";
import { useContext } from "react";
import { locateContext } from "../App";
import { ToastContainer } from 'react-toastify';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
// import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from 'dayjs';










interface MenuItem {
  path?: string;
  name: string;
  icon:any;
  isOpenMenu?: boolean;
  submenu?: MenuItem[];
  isActive?: boolean;
  onClick? : () =>  void;
}



interface SideBarProps {
  children: React.ReactNode;
  darkMode: boolean;
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  children,
  darkMode,
  isOpenMenu,
  toggleMenu,
}) => {

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { employeeRole, setEditRequestStatus} = useContext(locateContext);

  const currentDate = dayjs();
  
  // Get last 3 months including current month
  const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
    const date = currentDate.subtract(i, 'month');
    return {
      month: date.format('MMMM'), // Full month name
      year: date.format('YYYY')
    };
  });

  const [rotateIcon] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)"); // Define the breakpoint for mobile screens

  useEffect(() => {
    if (isMobile) {
    toggleMenu(); // Calls the toggleMenu function passed as a prop
    }
  }, [isMobile]);
  

  // // Function to close the menu
  // const closeMenu = () => {
  //   toggleMenu(); // Calls the toggleMenu function passed as a prop
  // };

  const [open, setOpen] = useState(false);


  const handleMenuItemClick = (openStatus: boolean) => {
    setOpen(openStatus)
  };

  const [userMenuItems] = useState<MenuItem[]>([
        {
      path: "/payroll",
      name: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      name: "Leave Request",
      // icon: <img className="menu_icons" src={Raise} alt="humanImage"/>,
      icon:<BackHandOutlinedIcon/>,
      path:"/payroll",
      onClick: ()=>handleMenuItemClick(true), // Example onClick function
    },
    {
      path: "/payroll/trackreq",
      name: "Track Request",
      icon: <GpsFixedIcon/>,
                      onClick: ()=>toggleMenu(), // Example onClick function

    },
    {
      name: "Payslip",
      icon: <PackagingList />,
      path: "/payroll",

      submenu: [
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[0].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[1].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[2].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
      ],
    },
    // {
    //   path: "/coins",
    //   name: "Coins",
    //   // icon:     <img className="menu_icons" src={coins} alt="coins" /> ,
    //   icon:<MonetizationOnOutlinedIcon/>,
    // },
        {
      path: "/payroll/calendar",
      name: "Attendance",
      icon: <CalendarMonthOutlinedIcon />,
                            onClick: ()=>toggleMenu(), // Example onClick function

    },
  ]);

  const [manager] = useState<MenuItem[]>([
        {
      path: "/payroll",
      name: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      name: "Leave Request",
      // icon: <img className="menu_icons" src={Raise} alt="humanImage"/>,
      icon:<BackHandOutlinedIcon/>,
      path:"/payroll",


      onClick: ()=>handleMenuItemClick(true), // Example onClick function
    },
    {
      path: "payroll/trackreq",
      name: "Track Request",
      icon: <GpsFixedIcon/>,
    },
    {
      name: "Payslip",
      icon: <PackagingList />,
      path: "/payroll",
      submenu: [
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[0].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[1].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[2].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
      ],
    },
    {
      name: "Requests",
      // icon:   <img className="menu_icons" src={projectleadicon} alt="projectlead" />      ,
      icon:<GroupsOutlinedIcon/>,
      path: "/payroll",
      submenu: [
        {
          path: "payroll/trackreq",
          name: "Leave Requests",
          icon: <HiOutlineHandRaised />,
        },
        // {
        //   path: "/coinsrequests",
        //   name: "Coins Requests",
        //   icon: <HiOutlineHandRaised />,
        // },
      ],
    },
    {
      path: "/payroll/calendar",
      name: "Attendance",
      icon: <CalendarMonthOutlinedIcon />,
    },
    // {
    //   name: "Coins",
    //   // icon:     <img className="menu_icons" src={coins} alt="coins" /> ,
    //   icon:<MonetizationOnOutlinedIcon/>,
    //   path: "/",

    //   submenu: [
    //     {
    //       path: "/coinsdetail",
    //       name: "Coins Detail",
    //       icon: <HiOutlineHandRaised />,
    //     },
    //     {
    //       path: "/coinsrequests",
    //       name: "Coins Requests",
    //       icon: <HiOutlineHandRaised />,
    //     },
    //     {
    //       path: "/coinschart",
    //       name: "Coins Chart",
    //       icon: <HiOutlineHandRaised />,
    //     },
    //     {
    //       path: "/coinsassigning",
    //       name: "Coins Assigning",
    //       icon: <HiOutlineHandRaised />,
    //     },
    //   ],
    // },
  ]);


  const [admin] = useState<MenuItem[]>([
    
    {
      path: "/payroll",
      name: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      name: "Payslip",
      icon: <PackagingList />,
      path: "/payroll",
      submenu: [
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[0].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[1].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
        {
          path: "/payroll/payslip",
          name: lastThreeMonths[2].month,
          icon: <HiOutlineHandRaised />,
                                onClick: ()=>toggleMenu(), // Example onClick function

        },
      ],
    },
    {
      path: "/payroll/calendar",
      name: "Attendance",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      path: "payroll/employees",
      name: "Employees",
      icon:<FactCheckOutlinedIcon/>,
    },

        {
      name: "Company",
      icon: <PackagingList />,
      path: "/payroll/company",
    },

  ]);


  useEffect(() => {
    if (employeeRole === "Employee"){
      setMenuItems(userMenuItems)
      setEditRequestStatus("Pending")
    }else if(employeeRole === "Manager"){
      setMenuItems(manager)
      setEditRequestStatus("Manager Approved")

    }else if (employeeRole==="Admin"){
      setEditRequestStatus("Admin Approved")
      setMenuItems(admin)
    }else{
      setMenuItems(userMenuItems)
    }
  }, [employeeRole]);



  const [isOpenSubMenu, setIsOpenSubMenu] = useState(
    new Array(menuItems.length).fill(false)
  );

  const toggleSubMenu = (index: number) => {
    setIsOpenSubMenu((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Menu Active color if refresh means not change color
  const toggleActiveMenu = (index: number) => {
    sessionStorage.setItem("activeMenuItemIndex", index.toString());

    setMenuItems((prevState) =>
      prevState.map((item, i) => ({
        ...item,
        isActive: i === index, // Set isActive true for clicked item, false for others
      }))
    );
  };
  // const theme = useTheme();

  useEffect(() => {
    const activeIndex = sessionStorage.getItem("activeMenuItemIndex");
    if (activeIndex !== null) {
      toggleActiveMenu(parseInt(activeIndex));
    }
  }, []);

  // // Function to handle icon rotation
  // const handleIconRotation = () => {
  //   // setRotateIcon(!rotateIcon);
  //   toggleMenu();
  // };
  return (
    <div>




    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: darkMode ? "#222222" : "",
      }}
    >

          {!employeeRole ? (
      <div>
      </div>
    ):(
      <Box
        sx={{
          width: isOpenMenu ? "230px" : "45px",
          transition: "width 0.3s ease",
          borderRight: "1px solid #d1d1d1",
          bgcolor: darkMode ? "#222222" : "#fff",
          color: darkMode ? "primary.contrastText" : "text.primary",
          position: isMobile ? "absolute" : "fixed",
          top: 0,
          bottom: 0,
          zIndex: 1,
          overflowY: "auto",
          boxShadow:  "rgba(0,0,0, 0.24) 0px 3px 8px" ,

        }}
      >
        <div className="top-section">
          <IconButton
            onClick={() => {
    toggleMenu();
            }}
            sx={{
              cursor: "pointer",
              color: darkMode ? "#eeeeed" : "#000000",
              "&:hover": {
                animation: "pulse 1s infinite",
              },
              transform: rotateIcon ? "rotate(90deg)" : "rotate(0deg)", // Rotate the icon based on the state
              transition: "transform 0.4s ease", // Add transition for smooth rotation effect
            }}
          >
            <AiOutlineBars size={22} />
          </IconButton>
        </div>
        {menuItems.map((item, index) => (
          <div key={index} className="menu" onClick={ item.onClick}>
            <Box
              component={Link}
              to={!item.submenu && item.path || '/payroll'}
                            onClick={() => {
                item.submenu && toggleSubMenu(index);
                toggleActiveMenu(index);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                // color: "red",
                bgcolor: item.isActive
                  ? darkMode
                    ? "#4d8c52"
                    : "#4D8C52"
                  : "",
                "&:hover": {
                  bgcolor: item.isActive
                    ? darkMode
                      ? "#4d8c52d1"
                      : "#4d8c52d1"
                    : darkMode
                    ? "#363636"
                    : "#f0f0f0",
                  // color: darkMode ? "red" : "#000",
                },
              }}
              style={{
                color: item.isActive
                  ? darkMode
                    ? "#fff"
                    : "#FFF" // Active and darkMode
                  : darkMode
                  ? "#fff"
                  : "#323232", // Normal darkMode: red, Otherwise: black
              }}
            >
              <div>
                {!isOpenMenu ? (
                  <div className="icon">{item.icon}</div>
                ) : (
                  <Box
                    className="icon"
                    sx={{
                      animation: isOpenMenu
                        ? `slideInLeft ${index * 0.2}s ease forwards`
                        : "none",
                    }}
                    onClick={ item.onClick}
                    
                  >
                    {item.icon} <span className="menuName" > {item.name}</span>
                    {item.submenu && (
                      <div className="arrow-container" >
                        <MdKeyboardArrowDown
                          className={
                            isOpenSubMenu[index] ? "arrow-open" : "arrow-closed"
                          }
                        />
                      </div>
                    )}
                  </Box>
                )}
              </div>
            </Box>
            {item.submenu && isOpenSubMenu[index] && isOpenMenu && (
              <div className="submenu" >
                {item.submenu.map((subItem, subIndex) => (
                  <Box
                    key={subIndex}
                    component={Link}
                    to={subItem.path || '/payroll'}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                        color: "#000",
                      },
                    }}
                    onClick={ subItem.onClick}

                  >
                    <div className="submenuName1">
                      {/* {subItem.icon} */}
                      <span className="submenuName">{subItem.name}</span>
                    </div>
                  </Box>
                ))}
              </div>
            )}
          </div>
        ))}
      </Box>
    )}


      <Box
        sx={{
          flexGrow: 1,
          background: "#effaef",
          bgcolor: darkMode ? "#222222" : "#effaef",
          paddingTop: "64px", // Assuming the height of the header is 64px
          paddingLeft: isOpenMenu ? (isMobile ? "20px" : "230px") : "20px",
          // height: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
        boxShadow="5px 5px 10px rgba(0, 0, 0, 0.7)"

      >
        <main
          style={{
            background: darkMode ? "#494949" : "",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          {children}
        </main>
      </Box>
    
      {/* <Drawer anchor="right" open={open} onClose={()=>handleMenuItemClick(false)}>
          o;gdfdko
      </Drawer> */}
      <RaiseRequest open={open} onClose={()=>handleMenuItemClick(false)}/>
      {/* <InventoryLeadRaiseRequest open={openInventoryLeadRaise} onClose={()=>setOpenInventoryLeadRaise(false)}/> */}

      <ToastContainer/>
      
    </Box>

    </div>

  );
};

export default SideBar;
