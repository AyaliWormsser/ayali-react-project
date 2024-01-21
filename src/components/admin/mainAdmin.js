import NewMeeting from "../users/newMeeting2";
import BussinessDetails from "./bussinessDetails";
import { ModeContext } from "../../App";
import MeetingsDetails from "./meetingsDetails";
import ServicesDetails from "./servicesDetails";
import store from "../dataStores/meetings";
import Box from '@mui/material/Box';
import { Button, Grid } from "@mui/material";
import { Outlet } from 'react-router-dom';
import bussiness from "../dataStores/bussiness";




export default function MainAdmin() {
    function changeToServices() {
        window.location.pathname = '/admin/Services';
    }
    function changeToAppointments() {
        window.location.pathname = '/admin/Appointments';
    }
    

    return (<div sx={{ AlignItems: 'center' }}>
        <ModeContext.Provider value={{ isAdmin: true }}>
            <BussinessDetails ></BussinessDetails>
        </ModeContext.Provider><br/><br/>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center">
            <Button sx={{margin:'1em', backgroundColor:'black'}} size="medium" width="50%" variant="contained" onClick={changeToServices}>שירותי עסק</Button>
            <Button  sx={{margin:'1em', backgroundColor:'black'}} size="medium" width="50%" variant="contained" onClick={changeToAppointments}>פגישות</Button></Grid>

        <Outlet></Outlet>
    </div>)
}
