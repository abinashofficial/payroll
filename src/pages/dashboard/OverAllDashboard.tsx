import Box from '@mui/material/Box';

import "./DashBoard.css"

import {TodayRequest} from "./TodayReq.tsx"













export function OverAllDashboardRequest() {

  
  return (
    <Box sx={{ flexGrow: 1 }}>


<TodayRequest/>





    </Box>
  );
}



export default OverAllDashboardRequest;




