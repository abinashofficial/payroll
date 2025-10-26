import  { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import './CommonDrawer.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';




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

export function VisibleRequest({ open, onClose, item }: { open: boolean; onClose: () => void ;item: Item}) {

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
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper className="paper_width">
      <Button  style={{
    justifyContent:"flex-end",
  }} onClick={onClose} >
    <CloseIcon />
      </Button>
        <div className="fields_gap">
          <h2>Raised Request</h2>
        </div>

        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="category">{properties.category}</InputLabel>
            <Select
              labelId="category"
              id="category-select"
              label="Category"
              disabled
            >
            </Select>
          </FormControl>
        </div>

        <div className="fields_gap">
        <TextField
    className="req_fields"
    id="outlined-basic"
    label={properties.purpose}
    variant="outlined"
    disabled
  />
        </div>

        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="transportFrom">{properties.transportFrom}</InputLabel>
            <Select
              labelId="transportFrom"
              id="transportFrom-select"
              label="Transport from"
              disabled
            >
            </Select>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <FormControl className="req_fields">
            <InputLabel id="transportTo">{properties.transportTo}</InputLabel>
            <Select
              labelId="transportTo"
              id="transportTo-select"
              label="Transport To"
              disabled
            >
            </Select>
          </FormControl>
        </div>

        <div className="fields_gap">
          <FormControl className="req_fields">
            <InputLabel id="transportMode">{properties.transportMode}</InputLabel>
            <Select
              labelId="transportMode"
              id="transportMode-select"
              label="Transport Mode"
              disabled
            >
            </Select>
          </FormControl>
        </div>

      </Paper>
    </Drawer>
  );
}
