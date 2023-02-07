import { useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import './SkiResort.css';
import { Paper, FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { addResort } from '../sevrices/skiresortapi';

const initialValue = {
    name: '',
    location: "",
    numberofskiruns: '',
    image: '',
}

const FormContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
        margin-bottom: 30px;
`;

const CreateSkiResort = () => {
    const [skiresort, setSkiResorts] = useState(initialValue);

    const [image, setImage] = useState('');
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });


    const { name, numberofskiruns, location } = skiresort;
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setSkiResorts({ ...skiresort, [e.target.name]: e.target.value, image: image })
    }

    const addSkiResortData = async () => {
        await addResort(skiresort);
        navigate('/');
    }

    return (
        <Paper sx={{ width: '100%', height: '1200px', overflow: 'auto' }}>
            <FormContainer>
            <Typography variant='h3' className={'headerStyle'}>Add Ski Resort Data</Typography>
            <FormControl>
            <InputLabel htmlFor="my-input">Capture Ski Resort Image</InputLabel>
                <div sx={{marginTop: 20}}>
                    <div className="webcam-img">
                        {image === '' ? <Webcam
                            audio={false}
                            height={200}
                            ref={webcamRef}
                            mirrored={true}
                            screenshotFormat="image/jpeg"
                            width={220}
                        /> : <img src={image} alt="abc"/>}
                    </div>
                    <div>
                        {image !== '' ?
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImage('')
                                }}
                                className="webcam-btn">
                                Retake Image
                            </Button>
                            :
                            <Button onClick={(e) => {
                                e.preventDefault();
                                capture();
                            }}
                            className="webcam-btn">Capture</Button>
                        }
                    </div>
                </div>
            </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name of Ski Resort</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='name' value={name} required id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">location</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='location' value={location} required id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">No of Ski Runs Conducted</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='numberofskiruns' value={numberofskiruns} required id="my-input" />
                </FormControl>
                <FormControl>
                    <Stack spacing={2} direction="row">
                        <Button component={Link} to='/' variant="outlined"> Back </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ marginRight: 10, backgroundColor: '#3a5aba', float: 'right' }}
                            onClick={() => addSkiResortData()}>
                            Create
                        </Button>
                    </Stack>
                </FormControl>
            </FormContainer>
        </Paper>
    )
}

export default CreateSkiResort;