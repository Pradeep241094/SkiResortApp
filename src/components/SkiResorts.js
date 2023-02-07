import { useState, useEffect } from 'react';
import './SkiResort.css';
import {
    Box, Grid, Paper, Stack, Button, Typography, Card, CardContent, CardMedia, CardActions,
} from '@mui/material'
import { getSkiResortList, deleteResortData } from '../sevrices/skiresortapi';
import { Link } from 'react-router-dom';

const SkiResortsList = () => {
    const [skiResorts, setSkiResorts] = useState([]);

    useEffect(() => {
        getAllSkiResorts();
    }, []);

    const deleteSkiResortData = async (id) => {
        await deleteResortData(id);
        getAllSkiResorts();
    }

    const getAllSkiResorts = async () => {
        let response = await getSkiResortList();
        setSkiResorts(response.data);
    }

    return (
        <Paper sx={{ width: '100%', paddingBottom: '10px'}}>
            <Typography variant='h3' className={'headerStyle'}>SkiResort Data</Typography>
            <Stack style={{marginLeft: 70, marginBottom: 20}} spacing={1} direction="row">
                <Button style={{ backgroundColor: '#3a5aba' }} component={Link} to='/add' variant="contained" backgroundColor="#3a5aba" color="primary">
                    Add New Ski Resort
                </Button>
            </Stack>
                <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                    <Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                        {skiResorts.map((ski) => (
                            <Grid item xs={2} sm={4} md={4} key={ski.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt=""
                                    height="140"
                                    image={ski.image}
                                    title={ski.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="body1" component="div">
                                    {ski.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Location</b> : {ski.location}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Number of Ski Runs</b>: {ski.numberofskiruns}
                                    </Typography>
                                </CardContent>
                                    <CardActions>
                                        <Stack spacing={2} direction="row">
                                            <Button color="primary" variant="outlined" component={Link} to={`/edit/${ski.id}`}>Edit</Button>
                                            <Button color="secondary" variant="contained" style={{ backgroundColor: '#b12f2f' }}
                                                onClick={() => deleteSkiResortData(ski.id)}>Delete</Button>
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>       
        </Paper>
    )
}

export default SkiResortsList;