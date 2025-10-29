import { useContext } from "react";
import { locateContext } from "../../App";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
// import CustomStepper from "../../components/stepper/Stepper";
import Box from '@mui/material/Box';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { VisibleRequest } from "../raise-req/VisibleReq";
// import { EditRequest } from "../raise-req/EditReq";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ManagerRequest } from "../raise-req/ManagerReq";










const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// const pageSize = 5; // Number of items per page

interface Item {
  name: string;
  employee_id: string;
  employee_name: string;
  package_type: string;
  status: string;
  transport_from: string;
  transport_to: string;
  transport_mode: string;
  purpose: string;
    [key: string]: string | number; // Index signature for additional properties

}

export function ManagerTrackRequest() {

    const { trackrequest} = useContext(locateContext);
  // const [projectLeadStatus, setProjectLeadStatus] = useState(4);
  // const [inventoryLeadStatus, setInventoryLeadStatus] = useState(4);
  // const [packingStatus, setPackingStatus] = useState(4);
  // const [qualityLeadStatus, setQualityLeadStatus] = useState(4);
  // const [pendingLeadStatus, setPendingLeadStatus] = useState(1);

  // const [progressBarValue, setProgressBarValue] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(5);


  
  // const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // const data = trackrequest // Provide your data here


  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [overallFilter, setOverallFilter] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [unFilter, setUnFilter] = useState<boolean>(false);




  const filteredRows = trackrequest.filter((row: any) => {
    return Object.entries(row).some(([_key, value]) => {
      if (!overallFilter) return true;
      if (typeof value === 'string') {
        return value.toLowerCase().includes(overallFilter.toLowerCase());
      }
      return false;
    }) && Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (typeof row[key] === 'number') {
        return row[key] == parseInt(value);
      } else {
        return row[key].toLowerCase().includes(value.toLowerCase());
      }
    });
  });
  
  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredRows.length);
  const currentItems = filteredRows.slice(startIndex, endIndex);
  const [visibleReq, setVisiblereq] = useState(false);
//   const [editReq, setEditreq] = useState(false);
  const [deleteReq, setDeleteReq] = useState(false);

  const [selectItem, setSelectItem] = useState({
    name: "",
    employee_id: "",
    employee_name: "",
    package_type: "",
    status: "",
    transport_from: "",
    transport_to: "",
    transport_mode: "",
    purpose: "",
  });





  const handleClick = (item: Item, index:any) => {
    console.log(item, "item")
    setClickedRowIndex(index)

    // if (item.status == "Pending"){
    //     setProjectLeadStatus(4)
    //     setProgressBarValue(4)
    //     setPackingStatus(4)
    //     setQualityLeadStatus(4)
    //     setInventoryLeadStatus(4)
    //     setPendingLeadStatus(1)

    //   } else if (item.status == "Project Lead Approved"){
    //     setProjectLeadStatus(1)
    //     setPackingStatus(4)
    //     setQualityLeadStatus(4)
    //     setInventoryLeadStatus(4)
    //     setProgressBarValue(16)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Project Lead Rejected"){
    //     setProjectLeadStatus(2)
    //     setPackingStatus(4)
    //     setQualityLeadStatus(4)
    //     setInventoryLeadStatus(4)
    //     setProgressBarValue(16)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Inventory Lead Approved"){
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setPackingStatus(4)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(24)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Inventory Lead Rejected"){
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(2)
    //     setPackingStatus(4)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(16)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Approved for Packaging"){
    //     setPackingStatus(1)
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(32)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Packer Rejected"){

    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setProgressBarValue(24)
    //     setQualityLeadStatus(4)
    //     setPackingStatus(2)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Packed"){

    //     setPackingStatus(1)
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(32)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Repack"){

    //     setPackingStatus(1)
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(32)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Quality Lead Approved"){
    //     setPackingStatus(1)
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setQualityLeadStatus(1)
    //     setProgressBarValue(45)
    //     setPendingLeadStatus(1)

    //   }else if (item.status == "Quality Lead Rejected"){
    //     setPackingStatus(1)
    //     setProjectLeadStatus(1)
    //     setInventoryLeadStatus(1)
    //     setQualityLeadStatus(2)
    //     setProgressBarValue(32)
    //     setPendingLeadStatus(1)

    //   }
    //   else if (item.status == "Cancelled"){
    //     setPendingLeadStatus(2)
    //     setPackingStatus(4)
    //     setProjectLeadStatus(4)
    //     setInventoryLeadStatus(4)
    //     setQualityLeadStatus(4)
    //     setProgressBarValue(2)
    //   }
    // Your handle click logic here
  };

  // useEffect(() => {
  //   if (currentItems && currentItems.length>0){
  //       handleClick(currentItems[0],0)
  //     }
  // }, []);



  // const handleCheckboxChange = (index: number) => {
  //   const selectedIndex = selectedItems.indexOf(index);
  //   let newSelected: number[] = []; // Initialize as an empty array
  
  //   if (selectedIndex === -1) {
  //     newSelected = [...selectedItems, index]; // Add index to newSelected array
  //   } else if (selectedIndex === 0) {
  //     newSelected = selectedItems.slice(1); // Remove first element from selectedItems
  //   } else if (selectedIndex === selectedItems.length - 1) {
  //     newSelected = selectedItems.slice(0, -1); // Remove last element from selectedItems
  //   } else if (selectedIndex > 0) {
  //     newSelected = [
  //       ...selectedItems.slice(0, selectedIndex), // Elements before selectedIndex
  //       ...selectedItems.slice(selectedIndex + 1), // Elements after selectedIndex
  //     ];
  //   }
  
  //   setSelectedItems(newSelected);
  //   // Your handle checkbox change logic here
  // };
  

// const handleSelectAllClick = () => {
//   if (selectedItems.length < currentItems.length) {
//     // Select all items
//     setSelectedItems(currentItems.map((_item: Item, index: Number) => index));
//   } else {
//     // Deselect all items
//     setSelectedItems([]);
//   }
//   // Your handle select all logic here
// };

  const goToPage = (pageNumber: number) => {
    if (totalPages>=pageNumber && pageNumber>=1){
        setCurrentPage(pageNumber);
  
      }
    // Your go to page logic here
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const userAction = (item: Item, action: string) => {
    
    if (action==="visible"){
        setVisiblereq(!visibleReq)
        setSelectItem(item)
    }
  };



//     // Assuming Row is the interface you've defined
// const filteredRows = currentItems.filter((row: Item) =>
//   row.name.toLowerCase().includes(searchTerm.toLowerCase())
// );




      // Function to handle overall filter change
  const handleOverallFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOverallFilter(value);
  };


  // // Function to update filters state
  // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  //   const value = e.target.value;
  //   setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  // };

    // Function to handle dropdown filter change
    const handleDropdownFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
      const value = e.target.value;
      setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    // const handleClickOpenFilter = () => {
    //   setOpenFilter(true);
    // };

    const handleClose = (_event: React.SyntheticEvent<unknown>) => {
        setOpenFilter(false);
    };

    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const [ setCurrentDate] = useState<string>('');
    // const [ setErrorMsg] = useState<string>('');
    // const [ setErrorSnackbarOpen] = useState<boolean>(false);
    // const { createDoc } = useFrappeCreateDoc();
    const navigate = useNavigate();

  
    // useEffect(() => {
    //   const now = new Date();
    //   const year = now.getFullYear();
    //   const month = String(now.getMonth() + 1).padStart(2, '0');
    //   const day = String(now.getDate()).padStart(2, '0');
  
    //   const formattedDate = `${year}-${month}-${day}`;
    //   setCurrentDate(formattedDate);
    // }, []);
    // const { updateDoc } = useFrappeUpdateDoc();

    const handleDelete = () => {
      // let errorMessage = ""
      // const formRaiseRequest = {
      //   status: "Cancelled",
      //   updated_request: currentDate,
      //   updated_by: empdetail.employee_name,
      //   dashboard_status:"Cancelled",
      // };
        try {
          setDeleteReq(!deleteReq)
            //  updateDoc("Packaging Request", `${selectItem.name}`, formRaiseRequest);
            console.log("Document updated successfully ", selectItem.name);
            let message = selectItem.name + " - Cancelled successfully ";

            toast.success(message);
            setTimeout(() => {
              navigate("/payroll/trackreq")
              // window.location.reload();
            }, 5000);
  
          } catch (error) {
            // errorMessage = "There was an error while creating the document."
            console.log("Error updating document:", error)
            // setErrorMsg(errorMessage);
            // setErrorSnackbarOpen(true);
            console.error("Error updating document:", error);
          }
    };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}
    >
        <div className="filter_search">

      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div style={{
          backgroundColor:"white" ,
          height:"30px",
          borderRadius:"4px",
          padding:"3px",
        }}>
<div style={{
              display:"flex",

  }}>

  <div onClick={()=>setUnFilter(!unFilter)}>

  {
    unFilter === true && <FilterAltOffIcon  style={{
      color:"#4D8C52",
      cursor: "pointer"
    }}  />
  }
    {
    unFilter === false && <FilterAltIcon  style={{
      color:"#4D8C52",
      cursor: "pointer"
    }} onClick = {()=>{setFilters({}); setOpenFilter(!openFilter)}} />
  }
    </div>

  {/* <FilterAltIcon style={{
    color:"#4D8C52",
    cursor: "pointer",
  }} /> */}
  <p style={{
    // fontSize:"2px",
    fontWeight:"bold",
    color:"#4D8C52",
    marginLeft:"8px",
    marginTop:"4px",
  }}>
    More Filters
  </p>


  {
    openFilter === true && <ArrowDropUpIcon  style={{
      color:"#4D8C52",
      cursor: "pointer"
    }} {...bindTrigger(popupState)} 
    />
  }

{
    openFilter === false && <ArrowDropDownIcon  style={{
      color:"#4D8C52",
      cursor: "pointer",
    }} {...bindTrigger(popupState)} 
    
    />
  }
            </div>

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
            {/* <Typography sx={{ p: 2 }}> The content of the Popover.

            </Typography> */}
            <div style={{
  display:"flex",
  flexDirection:"column",
  width:"180px",
  padding:"4px",
}}>
            <select
        value={filters.package_type || ''}
        onChange={(e) => handleDropdownFilterChange(e, 'leave_type')}
        style={{
          height:"40px",
          borderRadius:"5px",
          marginTop:"5px",
          textAlign: 'center',
        }}      >
            category: ['Casual Leave (CL)', 'Sick Leave (SL)', 'Marriage Leave', 'Maternity Leave (ML)', 'Paternity Leave (PL)', 'Medical Leave', 'Others'],

        <option value="">Leave Type</option>
        <option value="Casual Leave (CL)">Casual Leave (CL)</option>
        <option value="Sick Leave (SL)">Sick Leave (SL)</option>
        <option value="Marriage Leave">Marriage Leave</option>
                <option value="Maternity Leave (ML)">Maternity Leave (ML)</option>
        <option value="Paternity Leave (PL)">Paternity Leave (PL)</option>
        <option value="Medical Leave">Medical Leave</option>
        <option value="Others">Others</option>

      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => handleDropdownFilterChange(e, 'status')}
        style={{
          height:"40px",
          borderRadius:"5px",
          marginTop:"5px",
          textAlign: 'center',
        }}
      >
        <option value="">Status</option>
        <option value="Pending">Pending</option>

        <option value="Manager Approved">Manager Approved</option>
        <option value="Manager Rejected">Manager Rejected</option>
                <option value="Cancelled">Cancelled</option>


      </select>
            </div>
            {/* <div style={{
              width:"200px",
            }}>
              khbhavh
            </div> */}

          </Popover>
        </div>
      )}
    </PopupState>



     
            <TextField
        id="search"
        label="Search"
        value={overallFilter}
        style={{
          width:"40vh",
          zIndex:0,
          margin:"10px",
        }}
        onChange={handleOverallFilterChange}
      />
              </div>





      <Box>


      </Box>

      <div style={{
              backgroundColor:"white",
              padding:"20px",
              borderRadius:"5px",
      }}>


        <TableContainer component={Paper}>
          <Table>
            <TableHead  style={{
            backgroundColor:"white" ,
          }}>
            

              <TableRow >
                {/* <TableCell>
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < currentItems.length}
                    checked={selectedItems.length === currentItems.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell> */}
                                <StyledTableCell align="center">S.NO</StyledTableCell>

                <StyledTableCell>Request ID</StyledTableCell>
                <StyledTableCell align="center">Employee ID</StyledTableCell>
                <StyledTableCell align="center">Employee Name</StyledTableCell>
                <StyledTableCell align="center">Leave Type</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
      {currentItems.map((item: any, index: any) => (
        <StyledTableRow
          key={index}
          onClick={() => handleClick(item, index)}
          sx={{ cursor: 'pointer',  '&.Mui-selected': { backgroundColor: '#D5E2FF' }}}
          selected= {clickedRowIndex === index}        >
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell>{item.request_id}</TableCell>
          <TableCell align="center">{item.employee_id}</TableCell>
          <TableCell align="center">{item.employee_name}</TableCell>
          <TableCell align="center">{item.leave_type}</TableCell>
              {item.status == "Pending" && <TableCell align="center" >
                    <div style={{
                      // backgroundColor:"#EFFCFF",
                      color:"#38B1BC",
                      borderRadius:"8px",
                      display:"flex",
                      justifyContent:"center",
                      gap:"10px",
                    }}>
                    <AccessTimeIcon/> <div style={{
                      display:"flex",
                      justifyContent:"center",
                      flexDirection:"column",

                    }}>
                    {item.status}
                      </div> 
                    </div>
                     </TableCell> }

                     {item.status == "Approved" && <TableCell align="center" >
                    
                    <div style={{
                      // backgroundColor:"#EDF9E7",
                      color:"#63B169",
                      borderRadius:"8px",
                      display:"flex",
                      justifyContent:"center",
                      gap:"10px",

                    }}>
                    <CheckCircleOutlineIcon/> <div style={{
                      display:"flex",
                      justifyContent:"center",
                      flexDirection:"column",

                    }}>
                    {item.status}
                      </div> 
                    </div>
                     </TableCell> }

                     {item.status == "Cancelled" && <TableCell align="center" >
                    <div style={{
                    // backgroundColor:"#E5C1BC",
                    color:"#FF8B7B",
                    borderRadius:"8px",
                    display:"flex",
                    justifyContent:"center",
                    gap:"10px",

                    }}>
                    <HighlightOffIcon/> <div style={{
                      display:"flex",
                      justifyContent:"center",
                      flexDirection:"column",
                    }}>
                    {item.status}
                      </div> 
                    </div>
                     </TableCell> }

                                          {item.status == "Rejected" && <TableCell align="center" >
                    <div style={{
                    // backgroundColor:"#E5C1BC",
                    color:"#FF8B7B",
                    borderRadius:"8px",
                    display:"flex",
                    justifyContent:"center",
                    gap:"10px",

                    }}>
                    <HighlightOffIcon/> <div style={{
                      display:"flex",
                      justifyContent:"center",
                      flexDirection:"column",
                    }}>
                    {item.status}
                      </div> 
                    </div>
                     </TableCell> }          <TableCell align="center">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <VisibilityTwoToneIcon
                onClick={() => userAction(item, 'visible')}
              />





            </div>
          </TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
          </Table>
        </TableContainer>
      </div>
      

          <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginTop: "50px",
              flexWrap:"wrap",

      }}>
      <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
        <KeyboardDoubleArrowLeftIcon sx={{ cursor: 'pointer' }} />
      </IconButton>

      <IconButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <KeyboardArrowLeftIcon sx={{ cursor: 'pointer' }} />
      </IconButton>
      <div style={{display:"flex",
      flexDirection:"column",
            justifyContent: "center",
          }}>
      <span>{currentPage} / {totalPages}</span>

      </div>
      <IconButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRightIcon sx={{ cursor: 'pointer' }} />
      </IconButton>
      <IconButton onClick={goToLastPage} disabled={currentPage === totalPages}>
        <KeyboardDoubleArrowRightIcon sx={{ cursor: 'pointer' }} />
      </IconButton>

      <div style={{
      display:"flex",
    }}>
    <div style={{
      marginTop:"9px",
    }}>
      <h4>
      Page:

      </h4>
    </div>
    <div style={{

    }}>
    <select
        value={pageSize || 5}
        onChange={(e) => setPageSize((parseInt(e.target.value, 10)))}
        className="filter_width"
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>    </div>
    </div>
    </div>

    {/* <div style={{
      display:"flex",
      justifyContent:"end",
    }}>
    <div style={{
      marginTop:"5px",
    }}>
      <h4>
      Rows Per Page:

      </h4>
    </div>
    <div style={{

    }}>
    <select
        value={pageSize || 5}
        onChange={(e) => setPageSize((parseInt(e.target.value, 10)))}
        className="filter_width"
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>    </div>
    </div> */}



      <ManagerRequest open={visibleReq} onClose={()=>userAction(selectItem,"visible")} item = {selectItem}/>
      {/* <EditRequest open={editReq} onClose={()=>userAction(selectItem,"edit")} item = {selectItem}/> */}








      <Dialog
        // fullScreen={fullScreen}
        open={deleteReq}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete this Request?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Once it's deleted, it can't be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>setDeleteReq(!deleteReq)}>
            Disagree
          </Button>
          <Button onClick={handleDelete} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
 


    </div>
  );
}
