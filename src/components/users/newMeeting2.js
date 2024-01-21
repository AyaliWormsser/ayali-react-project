import { observer } from "mobx-react";
import meetingsStore from "../dataStores/meetings";
import servicesStore from "../dataStores/services";
import { useForm } from "react-hook-form";
import { Select } from "@mui/base";
import { MenuItem } from "@mui/base";
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from "dayjs";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";



const NewMeeting2 = observer((props) => {
    const { selectedService, closeDialog, cancelDialog } = props;
    const [service, setService] = useState(selectedService);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [failed, setFailed] = useState(false);
    const servicesList = servicesStore.getServices;
    const res = meetingsStore.getStatus;
    const { register, handleSubmit } = useForm({
        defaultValues: {
            serviceName: selectedService?.name,
            serviceDescription: selectedService?.description,
            servicePrice: selectedService?.price,
            clientName: '',
            clientPhone: '',
            clientEmail: '',
        }
    })


    function handleSelect(id) {
        const selected = servicesList.find(x => x.id === id);
        setService(selected);
        alert(JSON.stringify(selected));
    }

    const handleSelectedDate = ((date) => {
        setSelectedDate(date);

    })


    async function onSubmit(data) {
        data.id = meetingsStore.getCount + 1;
        const combinedDateTime = new Date(`${data.date}T${data.hour}:00`);
        data.dateTime = dayjs(combinedDateTime).format('YYYY-MM-DD HH:mm:ss');
        const resValue = await meetingsStore.addMeeting(data);
        if (!resValue) {
            closeDialog();
            setFailed(false);
        }
        else {
            setFailed(true);
        }



    }




    return (<><Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"><form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('serviceName')}
                disabled
                autoFocus
                margin="dense"
                id="serviceName"
                label="שם השירות"
                type="text"
                fullWidth
            />
            <TextField
                {...register('serviceDescription')}
                disabled
                autoFocus
                margin="dense"
                id="serviceDescription"
                label="תיאור השירות"
                type="text"
                fullWidth
            />
            <TextField
                {...register('servicePrice')}
                disabled
                autoFocus
                margin="dense"
                id="servicePrice"
                label="מחיר"
                type="text"
                fullWidth
            />
            <TextField
                {...register('clientName')}
                autoFocus
                required
                margin="dense"
                id="clientName"
                label="שם הלקוח"
                type="text"
                fullWidth
            />
            <TextField
                {...register('clientPhone')}
                autoFocus
                margin="dense"
                required
                id="Phone"
                label="טלפון"
                type="text"
                fullWidth
            />
            <TextField
                {...register('clientEmail')}
                autoFocus
                margin="dense"
                required
                id="email"
                label="אימייל"
                type="email"
                fullWidth
            />
            <TextField

                {...register('date')}
                autoFocus
                margin="dense"
                id="date"
                label="תאריך"
                type="date"
                fullWidth

            />
            <TextField
                {...register('hour')}
                autoFocus
                margin="dense"
                id="hour"
                label="שעה"
                type="time"
                fullWidth

            />
            <br /><br />
            {failed && <Alert textAlign="center" severity="error">לא ניתן לקבוע פגישה בתאריך זה</Alert>}
            <Button size="medium" type='submit' variant="contained" sx={{ backgroundColor: '#ff0059' }} >הזמן</Button>
          



        </form></Grid>
    </>)
})

export default NewMeeting2;