import React, { useState, useEffect } from "react";
import { IconButton, Box, Avatar } from "@mui/material";
import { VscBellDot } from "react-icons/vsc";
import Logo from "../assets/logo_prison.svg";
import avatarPic from "../assets/avatar.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from "react-router-dom";



import { locateContext } from "../App";

interface HeaderProps {
  darkMode: boolean;
  isOpenMenu: boolean;
  toggleDarkMode: () => void;
}



const Header: React.FC<HeaderProps> = ({
  isOpenMenu,
  darkMode,
}) => {
  const { empdetail, setEmployeeRole, company} = useContext(locateContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
    const [logo, setLogo] = useState(company.logo);


  useEffect(() => {

setLogo(company.logo);
console.log(company.logo)
  },[company.logo]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdownMenu = document.querySelector(".profile-dropdown");
      if (isOpen && dropdownMenu && !dropdownMenu.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = () => {
  //   // navigate("/?cmd=web_logout");
  //   window.location.reload();
  // };

  return (
    <Box
      className="HeaderWrapper"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: darkMode ? "#222222" : "#fff",
        color: darkMode ? "#eeeeed" : "",
        animation: "fadeIn 1s ease forwards",
        boxShadow: isOpenMenu ? "rgba(0,0,0, 0.24) 235px 3px 8px" : "rgba(0,0,0, 0.24) 50px 3px 8px",
      }}
    >
      <Box
        sx={{ display: isOpenMenu ? "block" : "none", position: "relative" }}
      >
        <div style={{ width: "30px" }}>
          <Link to="/payroll">
          {
            logo? (
     <img style={{
            width:"50px",
            height:"50px",
          }} src={logo} alt="Company Logo" className="w-24 h-24 rounded-lg mb-2 border" />
            ):(
            <img className="largeLogo" src={Logo} alt="Logo" width="50px">
            </img>
            )
          }

              {/* <div className="logoLine"></div> */}
          </Link>
        </div>
      </Box>

      <Box sx={{ display: isOpenMenu ? "none" : "block" }}>
        <Link to="/payroll">
          {
            logo? (
     <img style={{
            width:"50px",
            height:"50px",
          }} src={logo} alt="Company Logo" className="w-24 h-24 rounded-lg mb-2 border" />
            ):(
            <img className="largeLogo" src={Logo} alt="Logo" width="50px">
            </img>
            )
          }
        </Link>
      </Box>
      <Box
        className="payrollText"
        sx={{
          color: darkMode ? "#fff" : "#323232",
          display: { xs: "none", sm: "block" },
          animation: "fadeIn 2s ease forwards", // Apply fadeIn animation
        }}
      >
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: darkMode ? "#222222" : "#fff",
            color: darkMode ? "#eeeeed" : "",
            animation: "fadeIn 3s ease forwards",
          }}
        >


<PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div style={{
          backgroundColor:"white" ,
          color:"white"
        }}>
                    <IconButton sx={{ color: darkMode ? "#eeeeed" : "" }} {...bindTrigger(popupState)} style={{
                      marginRight:"10px",
                    }} >
                      
            <VscBellDot size={30} />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}> The content of the Popover.

            </Typography>


          </Popover>
        </div>
      )}
    </PopupState>
{/* 
          <IconButton sx={{ color: darkMode ? "#eeeeed" : "" }} >
            <VscBellDot size={20} />
          </IconButton> */}
        </Box>

        <Box className="avatarpic" sx={{ position: "relative", marginRight: "10px" }}>

        {empdetail && empdetail.employee_name? (
                empdetail.image ? (
                  <Avatar alt={empdetail.employee_name} src={empdetail.image}  onClick={toggleDropdown} />
                ) : (
                  <Avatar
                    alt={empdetail.employee_name}
                    src={empdetail.employee_name.charAt(0).toUpperCase()}
                    onClick={toggleDropdown} />
                )
              ) : (
                <Avatar src={avatarPic} alt="Avatar" onClick={toggleDropdown} />
                )}
          {isOpen && (
            <Box
              className="profile-dropdown"
              sx={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                zIndex: 9999,
                border: "1px solid #d1d1d1",
                borderRadius: "4px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                minWidth: "150px",
                cursor: "pointer",
                bgcolor: darkMode ? "#222222" : "#fff",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  "&:hover": { bgcolor: darkMode ? "#333333" : "#f0f0f0" },
                }}
              >
                <span style={{ marginRight: "8px" }}>Profile</span>
              </Box>
              <Box
                sx={{
                  p: 1,
                  "&:hover": { bgcolor: darkMode ? "#333333" : "#f0f0f0" },
                }}
              >
                <span style={{ marginRight: "8px" }}>Switch Desk</span>
              </Box>
              <Box
                sx={{
                  p: 1,
                  "&:hover": { bgcolor: darkMode ? "#333333" : "#f0f0f0" },
                }}
                 onClick={() => {         setEmployeeRole(""); navigate("/")}}
              >
                <span                        
style={{ marginRight: "8px" }}>Log Out</span>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
