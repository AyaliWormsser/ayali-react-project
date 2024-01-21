import BussinessDetails from "../admin/bussinessDetails";
import { ModeContext } from "../../App";
import ServicesDetails from "../admin/servicesDetails";
import NewMeeting from "./newMeeting2";
import { useState } from "react";
import store from "../dataStores/services";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box, List, ListItem, Typography, Alert } from "@mui/material";
import singleService from "./singleService";
import SingleService from "./singleService";
import { observer } from "mobx-react";
import DoneIcon from '@mui/icons-material/Done';
import { Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';


const MainUser = observer(() => {

    const [open, setOPen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const services = store.getServices;
    const [service, setService] = useState(null);
    const handleOpen = (service) => {
        setService(service);
        setOPen(true);
    }

    const handleClose = () => {
        setOPen(false);
        handleOpenMessage();
    }
    const handleCancel = () => {
        setOPen(false);
    }

    const handleOpenMessage = () => {
        setOpenMessage(true);
    }
    const handleCloseMessage = () => {
        setOpenMessage(false);
    }

    const dialog = () => (<Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"><Dialog open={open} onClose={handleCancel}> 
            <DialogActions sx={{alignContent:"center", justifyContent:"center"}}>
                <Button size="small" variant="contained" sx={{ color: '#ff0059', backgroundColor: "white" }} onClick={handleCancel}><CancelIcon></CancelIcon></Button>
            </DialogActions>
            <DialogTitle textAlign="center" color="#ff0059" >הזמנת פגישה</DialogTitle>
            <Grid Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"> <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <NewMeeting selectedService={service} closeDialog={handleClose} ></NewMeeting>
                </DialogContent>
            </Grid>

        </Dialog></Grid>)

    const successMessage = () => (<Dialog open={openMessage} onClose={handleCloseMessage} >

        <DialogContent sx={{ textAlign: 'center', alignItems: 'center', backgroundColor: '#57db25c2' }}>
            <DialogContentText sx={{ textAlign: 'center', alignItems: 'center' }}>
                הפגישה נקבעה בהצלחה <DoneIcon ></DoneIcon>
            </DialogContentText>
        </DialogContent>
    </Dialog>)





    return (<>
        <ModeContext.Provider value={{ isAdmin: false }}>
            <BussinessDetails></BussinessDetails>
        </ModeContext.Provider>
        {open && dialog()}
        {openMessage && successMessage()}

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center" >
            {services.length == 0 && <><br/><br/><br/><Alert textAlign="center" severity="error">אין כרגע שירותים זמינים במערכת</Alert></>}
            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', direction: 'rtl', textAlign: 'center' }}>
                {services.map((service) => <ListItem container item xs={2} >
                    <ModeContext.Provider value={{ isAdmin: false }}>
                        <SingleService {...service} key={service.id} openDialog={handleOpen} cancelDialg={handleCancel} />
                    </ModeContext.Provider>

                </ListItem>
                )}</List></Grid>
    </>)
})
export default MainUser;