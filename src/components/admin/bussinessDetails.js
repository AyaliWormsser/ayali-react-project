import { useContext, useState } from "react";
import store from "../dataStores/bussiness";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, List, ListItem, ListItemAvatar, Avatar } from "@mui/material";
import Stack from '@mui/material/Stack';
import { observer } from "mobx-react";
import { ModeContext } from "../../App";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { blue } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Business';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DetailsIcon from '@mui/icons-material/Details';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


const BussinessDetails = observer(() => {


    const bussiness = store.getBussiness;
    const [toEdit, setToEdit] = useState(false);
    const { register, handleSubmit } = useForm({ defaultValues: bussiness });
    function saveDetails(details) {
        store.updateBussiness(details);
        setToEdit(false);
    }
    function handleClose() {
        setToEdit(false);
    }
    const dialog = () => (
        <Dialog open={toEdit} onClose={handleClose} sx={{ minWidth: 275, textAlign: 'right', alignContent: 'right', alignItems: "right ", direction: 'rtl' }}>
            <DialogTitle sx={{ color: "#ff0059" }}>עדכן פרטי עסק</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    עדכן כאן את פרטי העסק שלך
                </DialogContentText>
                <form onSubmit={handleSubmit(saveDetails)} dir="rtl" sx={{ direction: 'rtl', textAlign: 'right' }}>
                    <TextField
                        {...register('name')}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="שם העסק"
                        type="text"
                        fullWidth

                    />
                    <TextField
                        {...register('address')}
                        autoFocus
                        margin="dense"
                        id="address"
                        label="כתובת"
                        type="text"
                        fullWidth

                    />
                    <TextField
                        {...register('phone')}
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="טלפון"
                        type="text"
                        fullWidth

                    />
                    <TextField
                        {...register('owner')}
                        autoFocus
                        margin="dense"
                        id="owner"
                        label="בעלים"
                        type="text"
                        fullWidth

                    />
                    <TextField
                        {...register('description')}
                        autoFocus
                        margin="dense"
                        id="description"
                        label="תיאור העסק"
                        type="text"
                        fullWidth

                    />

                    <DialogActions sx={{ minWidth: 275, textAlign: 'center', alignContent: 'cenetr', alignItems: "center" }}>
                        <Button size="medium" type='submit' variant="contained" sx={{ backgroundColor: '#ff0059', margin: "1em" }} onClick={handleClose}>ביטול</Button>
                        <Button size="medium" type='submit' variant="contained" sx={{ backgroundColor: '#ff0059', margin: "1em" }} >שמירה</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >

    )

    return (<>
        {useContext(ModeContext).isAdmin && toEdit && dialog()}
        <Grid container
            direction="row"
            justifyContent="space-around"
            alignItems="space-around"
            alignContent="space-around">
            {store.logo}
            <Grid

                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                marginLeft="10em"
                marginTop="2.5em"
            ><List
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                }}
            >
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemAvatar >
                            <Avatar sx={{ backgroundColor: "green" }}>
                                {<LibraryBooksIcon />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bussiness === null ? "null" : bussiness.name} secondary="שם העסק" />
                    </ListItem >
                    {/* <Divider variant="inset" component="li" /> */}
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemAvatar >
                            <Avatar sx={{ backgroundColor: "turquoise" }}>
                                <PersonOutlineIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bussiness === null ? "null" : bussiness.owner} secondary="בעל העסק" />
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> */}
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemAvatar >
                            <Avatar sx={{ backgroundColor: "red" }}>
                                <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bussiness === null ? "null" : bussiness.phone} secondary="טלפון" />
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> */}
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "orange" }}>
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bussiness === null ? "null" : bussiness.address} secondary="כתובת" />
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> */}
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "purple" }}>
                                <DetailsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bussiness === null ? "null" : bussiness.description} secondary="פרטים נוספים" />
                    </ListItem>
                    <ListItem sx={{ textAlign: 'right' }}>
                        {useContext(ModeContext).isAdmin && <Button sx={{ backgroundColor: '#ff0059' }} size="small" width="50%" variant="contained" onClick={() => { setToEdit(true) }}>עדכון</Button>}
                    </ListItem>


                </List>
            </Grid>
        </Grid>






    </>)
}
)
export default BussinessDetails;