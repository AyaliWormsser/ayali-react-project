import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import NewMeeting from './newMeeting2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Accordion, AccordionDetails, AccordionSummary, DialogActions, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ModeContext } from '../../App';
import { useContext } from 'react';

export default function (details) {
    const { id, name, description, price, duration, openDialog } = details;

    return (
        <>
            <Accordion sx={{ width: '100%', backgroundColor:'#ff0059' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ textAlign: 'center' }}>{(!useContext(ModeContext).isAdmin) && <Button sx={{color:'black'}} onClick={() => openDialog(details)}><CalendarMonthIcon></CalendarMonthIcon></Button>} {details.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ direction: 'rtl', textAlign: 'right' }}>
                    <Typography>{details.description}</Typography>
                    <Typography>{details.price}</Typography>
                    <Typography>{details.duration}</Typography>
                </AccordionDetails>

            </Accordion>
        </>
    )

}