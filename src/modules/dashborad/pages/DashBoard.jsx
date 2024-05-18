import { Container } from "@mui/material"
import { Header } from "../../../shared/components/Header"
import { NavBar } from "../../../shared/components/NavBar"
import { Main } from "../components/Main"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const DashBoard = () => {
    // Its for styling the Item.
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return(
        <Container fixed>
            <Header/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} >
                    <Grid item xs={3}>
                       <Item><NavBar/></Item> 
                    </Grid>
                    <Grid item xs={9}>
                        <Main/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}