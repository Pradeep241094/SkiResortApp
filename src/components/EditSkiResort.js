import { useState, useEffect } from 'react';
import './SkiResort.css';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getSkiResortList, editSkiResortData } from '../sevrices/skiresortapi';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const initialValue = {
    name: '',
    manager: '',
    org: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditSkiResort = () => {
    const [skiresort, setskiresortData] = useState(initialValue);
    const { name, location, numberofskiruns} = skiresort;
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadskiresortDetails();
    }, []); // no dependencies

    const loadskiresortDetails = async() => {
        const response = await getSkiResortList(id);
        setskiresortData(response.data);
    }

    const editskiresort = async() => {
        const response = await editSkiResortData(id, skiresort);
        navigate('/');
    }

    const onChangeValue = (e) => {
        console.log(e.target.value);
        setskiresortData({...skiresort, [e.target.name]: e.target.value})
    }

    return (
            <Paper sx={{ width: '100%', height: '970px', overflow: 'hidden' }}>
            <Container>
            <Typography variant="h4">Update skiresort Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='name' required value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Location</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='location' required value={location} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Number of Ski Runs Conducted</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='numberofskiruns' required value={numberofskiruns} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <Stack spacing={2} direction="row">
            <Button  className='action_btn' component={Link} to='/' variant="outlined"> Back </Button>
             <Button className='action_btn' style={{ marginRight: 10, backgroundColor: '#3a5aba' }}  variant="contained" color="primary" onClick={() => editskiresort()}>Update</Button>
            </Stack>
            </FormControl>
            </Container>
            </Paper>
    )
}

export default EditSkiResort;