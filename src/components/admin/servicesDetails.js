import { observer } from "mobx-react";
import { useContext, useState } from "react";
import store from "../dataStores/services";
import SingleService from "../users/singleService";
import { ModeContext } from "../../App";
import { Form, useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import NewMeeting2 from "../users/newMeeting2";
import { Box, Grid, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';

const ServicesDetails = observer(() => {
    const services = store.getServices;
    const [toAdd, setToAdd] = useState(false);
    const [toInvite, setToInvite] = useState(false);
    const [selected, setSelected] = useState(null);
    const serviceId = store.countServices;
    const { register, handleSubmit } = useForm({ defaultValues: store.getServices });
    function saveDetails(details) {
        details.id = serviceId + 1;
        store.addService(details);
        setToAdd(false);

    }
    function handleClose() {
        setToAdd(false);
    }

    const dialog = () => (
        <Dialog open={toAdd} onClose={handleClose} sx={{ minWidth: 275, textAlign: 'center', alignContent: 'cenetr', alignItems: "center", direction: 'rtl' }}>
            <DialogTitle sx={{color:"#ff0059"}}> הוספת שירות חדש</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    הזן את פרטי השירות החדש
                </DialogContentText>
                <form onSubmit={handleSubmit(saveDetails)} sx={{ direction: 'rtl'}}>
                    <TextField {...register('name')} label="שם" fullWidth></TextField>
                    <TextField {...register('description')} label="תיאור" fullWidth></TextField>
                    <TextField {...register('price')} label="מחיר" fullWidth></TextField>
                    <TextField {...register('duration')} label="משך הזמן" fullWidth></TextField>
                    <DialogActions sx={{ minWidth: 275, textAlign: 'center', alignContent: 'cenetr', alignItems: "center" }}>
                        <Button size="medium"  variant="contained" sx={{ backgroundColor: '#ff0059', margin:"1em" }} onClick={handleClose}>ביטול</Button>
                        <Button type='submit' size="medium" variant="contained" sx={{ backgroundColor: '#ff0059', margin:"1em" }}>שמירה</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >)
    return (
        <>
            {store.countServices == 0 && <><br /><br /><Typography>לא קיימים שירותים זמינים</Typography></>}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center" ><List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', direction: 'rtl', textAlign: 'center' }}>
                   
                    {services.map((service) => <ListItem container item xs={2} >
                        <SingleService {...service} key={service.id} />
                    </ListItem>
                    )}<ListItem container item xs={2}> {useContext(ModeContext).isAdmin && <Button sx={{color:'black'}} onClick={() => { setToAdd(true) }}><AddIcon></AddIcon></Button>}</ListItem></List>
            </Grid>
            {toAdd && dialog()}
        </>
    )
})


export default ServicesDetails;

