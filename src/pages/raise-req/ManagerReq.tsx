import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { useContext } from 'react';
// import { locateContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CommonDrawer.css';
// import type { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from '@mui/icons-material/Close';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



interface SelectedOptions {
  category: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  description: string;
}



export function ManagerRequest({ open, onClose, item }: { open: boolean; onClose: () => void ;item: any}) {
    const [selectedDateFrom] = React.useState<Dayjs | null>(dayjs());
        const [selectedDateTo] = React.useState<Dayjs | null>(dayjs());
            const [openReject, setOpenReject] = React.useState(false);

          const clearRaiseReqList = () => {

    // setSelectedOptions({
    //   category: '',
    //   dateTimeFrom: '',
    //   dateTimeTo:'',
    //   description:'',
    // });

    onClose()
  }
        
      
  const updatePackagerequest = (msg:any) => {
    // console.log(selectedOptions)
    // let errorMessage = "";
    // // let status = "Pending";
    // if (employeeRole == "inventorylead"){
    //     status = "Inventory Lead Approved"
    // }else if (employeeRole == "projectlead"){
    //     status = "Project Lead Approved"
    // }

        
                          console.log("Created Successfully Raise Request");
              let message = msg+ " Successfully"
              toast.success(message);
              clearRaiseReqList();
              setTimeout(() => {
                // navigate("/payroll")
              }, 5000);
    };


  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    category: '',
    dateTimeFrom: '',
    dateTimeTo: '',
    description: '',
  });

              useEffect(() => {
                setSelectedOptions({
          category: item.leave_type,
          dateTimeFrom: item.datetime_from,
          dateTimeTo: item.datetime_to,
          description: item.description,
                })
              }, [item]);

  const [availableOptions] = useState<{ [key: string]: string[] }>({
    category: ['Casual Leave (CL)', 'Sick Leave (SL)', 'Marriage Leave', 'Maternity Leave (ML)', 'Paternity Leave (PL)', 'Medical Leave', 'Others '],

  });

      const handleClickOpen = () => {
        setOpenReject(true);
      };
      const handleClose = () => {
        setOpenReject(false);
      };



  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper className="paper_width">

      <Button  onClick={clearRaiseReqList} >
    <CloseIcon />
      </Button>
        <div className="fields_gap">
          <h2>Request</h2>
        </div>



        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category-select"
              value={selectedOptions.category}
              // onChange={handleChange('category')}
              label="Category"
              disabled
            >
              {availableOptions.category.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

                <div className="fields_gap">
        <TextField
    className="req_fields"
    id="outlined-basic"
    // onChange={handleTextFieldChange} // Pass handleChange directly without invoking it
    label="description"
    value={selectedOptions.description}
    variant="outlined"
    disabled
  />
        </div>


                <div className="fields_gap">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker           label="From Date"
          value={selectedDateFrom}
          // onChange={(newValue) => setSelectedDateFrom(newValue)}
          disabled
          />
      </DemoContainer>
    </LocalizationProvider>
        </div>

                <div className="fields_gap">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker           label="To Date"
          value={selectedDateTo}
          // onChange={(newValue) => setSelectedDateTo(newValue)}
          disabled
          />
          
      </DemoContainer>
    </LocalizationProvider>
        </div>





      
{/* 
        <div className="button_style">
          <Button className="cancel_button" onClick={onClose}>
            Cancel
          </Button>
          <Button className='submit_button' onClick={()=>updatePackagerequest()} variant="contained" >
            Submit
          </Button>
        </div> */}

        {/* <div>
          <Snackbar
            open={errorSnackbarOpen}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="error" variant="filled" sx={{ width: '100%' }}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </div> */}

        {
          item.status==="Pending"&&(
         <div className="button_style">
        <Button  className='cancel_button' onClick={handleClickOpen} >
        Reject 
      </Button>

      
      


<Button  className= "submit_button" onClick={()=>updatePackagerequest("Approved")} variant="contained">Approve</Button>
        </div>
          )
        }



        <Dialog
        // fullScreen={fullScreen}
        open={openReject}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Reject this Request?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Once deleted it can't retrieve.
          </DialogContentText> */}
                  <TextField
          id="outlined-multiline-static"
          label="Reason"
          multiline
          rows={4}
          // value={rejectReason}
          // onChange={(event) => setRejectReason(event.target.value)}
        />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>updatePackagerequest("Rejected")} autoFocus>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
      </Paper>

    </Drawer>
  );
}
