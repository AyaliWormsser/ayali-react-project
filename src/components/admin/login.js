import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Alert, CardActions, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import MainAdmin from "./mainAdmin";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import bussiness from '../dataStores/bussiness';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Login() {

    const [userName, setUserName] = useState("init");
    const [userPassword, setUserPassword] = useState("0");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8787/login', { name: userName, password: userPassword }).then((res) => {
            setIsAdmin(true);
        }).catch((err) => {
            console.log(err);
            setIsError(true);
            e.target.value = "";
        });
    }
    return (
        <>
            {
                isAdmin ? <MainAdmin /> :
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        
                    ><Box sx={{ width: '50%', }}>
                            <Card sx={{ minWidth: 275, textAlign: 'center', alignContent: 'cenetr', alignItems: "right", margin: "4em"}} >
                                <form onSubmit={handleSubmit}>
                                    <Typography sx={{ color: "#ff0059" }}>לכניסה כמנהל יש להזין שם משתמש וסיסמה</Typography>
                                    <CardContent> <TextField
                                        id="username"
                                        label="שם משתמש"
                                        variant="outlined"
                                        onChange={(e) => setUserName(e.target.value)} /></CardContent>
                                    <CardContent>
                                        <TextField
                                            id="password"
                                            label="סיסמה"
                                            type='password'
                                            variant="outlined"
                                            onChange={(e) => setUserPassword(e.target.value)} /></CardContent>
                                    <CardContent><Button size="large" type='submit' variant="contained" sx={{ backgroundColor: '#ff0059' }}>התחבר</Button></CardContent>
                                    <CardContent>   {isError && <Alert textAlign="center" severity="error">שם המשתמש או הסיסמה אינם נכונים</Alert>}
                                        {isAdmin && <Alert severity="success">התחברת בהצלחה</Alert>}</CardContent>
                                </form>
                            </Card>
                        </Box>
            
                      </Grid>

            }
        </>
    );
}



