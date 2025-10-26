import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import { useContext } from 'react';
// import { locateContext } from '../../App';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CommonDrawer.css';
import type { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from '@mui/icons-material/Close';
// import { useFrappeUpdateDoc } from "frappe-react-sdk";




interface SelectedOptions {
  category: string;
  transportFrom: string;
  transportTo: string;
  transportMode: string;
  purpose: string;
}



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
  }


export function EditRequest({ open, onClose, item }: { open: boolean; onClose: () => void ;item: Item}) {


    // const { updateDoc } = useFrappeUpdateDoc();


    const [properties, setProperties] = useState({
        category: 'Category',
        transportFrom: 'Transport From',
        transportTo:'Transport To',
        transportMode:'Transport Mode',
        purpose:'Purpose',
    })

    useEffect(() => {
        setProperties({
            category: item.package_type,
            transportFrom: item.transport_from,
            transportTo: item.transport_to,
            transportMode: item.transport_mode,
            purpose: item.purpose,
        })
      }, [item]);


  // const { empdetail } = useContext(locateContext);
  // const [currentDate, setCurrentDate] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = String(now.getMonth() + 1).padStart(2, '0');
  //   const day = String(now.getDate()).padStart(2, '0');

  //   const formattedDate = `${year}-${month}-${day}`;
  //   setCurrentDate(formattedDate);
  // }, []);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    category: item.package_type,
    transportFrom: item.transport_from,
    transportTo: item.transport_to,
    transportMode: item.transport_mode,
    purpose: item.purpose,
  });

  const [availableOptions, setAvailableOptions] = useState<{ [key: string]: string[] }>({
    category: ['Ground Components', 'Flight Components', 'Consumable Components'],
    transportFrom: ['Research Park (RF-1)', 'Thaiyur (Open Work Place-1)', 'Research Park (Open Work Place-2)',  'Sriharikota'],
    transportTo: ['Research Park (RF-1)', 'Thaiyur (Open Work Place-1)', 'Research Park (Open Work Place-2)', 'Sriharikota'],
    transportMode: ['Bike', 'Car', 'Bus', 'Van', 'Train', 'Ship', 'Flight'],
  });


  // Adjust the type of the 'label' parameter as needed
// Define event handler function for TextField
const handleTextFieldChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
  const selectedValue = event.target.value;
  console.log(selectedValue, "selectedValue")


  // Update selected options state
  setSelectedOptions((prevSelectedOptions) => ({
    ...prevSelectedOptions,
    ["purpose"]: selectedValue,
  }));

  // Update available options for subsequent labels
  setAvailableOptions((prevAvailableOptions) => {
    const updatedOptions = { ...prevAvailableOptions };

    // Remove the selected option from the available options
    Object.keys(updatedOptions).forEach((key) => {
      if (key !== "purpose") {
        updatedOptions[key] = updatedOptions[key].filter(
          (option) => option !== selectedValue
        );
      }
    });

    return updatedOptions;
  });  // Handle TextField change event here
};
  const handleChange = (label: string) => (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
  

    // Update selected options state
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [label]: selectedValue,
    }));
  
    // Update available options for subsequent labels
    setAvailableOptions((prevAvailableOptions) => {
      const updatedOptions = { ...prevAvailableOptions };
  
      // Remove the selected option from the available options
      Object.keys(updatedOptions).forEach((key) => {
        if (key !== label) {
          updatedOptions[key] = updatedOptions[key].filter(
            (option) => option !== selectedValue
          );
        }
      });
  
      return updatedOptions;
    });
  };
   
  

  const updatePackagerequest = () => {
    // console.log(selectedOptions, "selectedOptions")
    let errorMessage = "";

        if ((!selectedOptions.category || !selectedOptions.purpose || !selectedOptions.transportFrom || !selectedOptions.transportTo || !selectedOptions.transportMode)) {
          errorMessage =
            "Please Select All Fields.";
            setErrorMsg(errorMessage);
            setErrorSnackbarOpen(true);
        }else{
            try {
                //  updateDoc("Packaging Request", `${item.name}`, formRaiseRequest);
                console.log("Document updated successfully ", item.name);
                let message = item.name + " - Edited successfully ";

                toast.success(message);
                clearRaiseReqList();
                setTimeout(() => {
onClose()                }, 5000);

              } catch (error) {
                errorMessage = "There was an error while creating the document."
                console.log("Error updating document:", error)
                setErrorMsg(errorMessage);
                setErrorSnackbarOpen(true);
                console.error("Error updating document:", error);
              }

                  
    }
  };

  const handleCloseSnack: (event: React.SyntheticEvent | Event, reason?: string) => void = (_event, reason) => {
        if (reason === 'clickaway') {
      return;
    }

    setErrorSnackbarOpen(false);
  };

  const clearRaiseReqList = () => {

    setSelectedOptions({
      category: '',
      transportFrom: '',
      transportTo:'',
      transportMode:'',
      purpose:'',
    });

    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper className="paper_width">
      <Button onClick={clearRaiseReqList} >
    <CloseIcon />
      </Button>
        <div className="fields_gap">
          <h2>Edit Request</h2>
                  <div style={{
                    marginLeft:"30px",
        }}>

        </div>
        </div>


        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="category">{properties.category}</InputLabel>
            <Select
              labelId="category"
              id="category-select"
              value={selectedOptions.category}
              onChange={handleChange('category')}
              label="Category"
            >
              {availableOptions.category.map(option => (
                <MenuItem className ="menuItemoption" key={option} value={option}>
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
    onChange={handleTextFieldChange} // Pass handleChange directly without invoking it
    label={properties.purpose}
    // value={selectedOptions.purpose}
    variant="outlined"
  />
        </div>

        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="transportFrom">{properties.transportFrom}</InputLabel>
            <Select
              labelId="transportFrom"
              id="transportFrom-select"
              value={selectedOptions.transportFrom}
              onChange={handleChange('transportFrom')}
              label="Transport from"
            >
              {availableOptions.transportFrom.map(option => (
                <MenuItem className ="menuItemoption" key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <FormControl className="req_fields">
            <InputLabel id="transportTo">{properties.transportTo}</InputLabel>
            <Select
              labelId="transportTo"
              id="transportTo-select"
              value={selectedOptions.transportTo}
              onChange={handleChange('transportTo')}
              label="Transport To"
            >
              {availableOptions.transportTo.map(option => (
                <MenuItem className ="menuItemoption" key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="transportMode">{properties.transportMode}</InputLabel>
            <Select
              labelId="transportMode"
              id="transportMode-select"
              value={selectedOptions.transportMode}
              onChange={handleChange('transportMode')}
              label="Transport Mode"
            >
              {availableOptions.transportMode.map(option => (
                <MenuItem className ="menuItemoption" key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="button_style">
        <Button className="cancel_button" onClick={onClose}>
            Cancel
          </Button>
          <Button className='submit_button' onClick={updatePackagerequest} variant="contained" >
            Submit
          </Button>

        </div>

        <div>
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
        </div>
 

      </Paper>
    </Drawer>
  );
}
