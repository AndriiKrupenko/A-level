import { connect } from 'react-redux';
import { useState } from 'react';
import store from '../../reducers';
import { actionNewAd, actionMyAds } from "../../actions";
import { history } from '../../App';
import { Button, TextField } from '@mui/material/';
import CMyDropzoneForAds from '../DropeZoneForAds';

import noImg from '../../no-img.png';

import { Box, Container, Typography, Grid } from '@mui/material';

const NewAd = ({ onAdd, myAds }) => { 
    // title, description, address, price
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState([])
    // const [imageForLayout, setImageForLayout] = useState('')

    const images = (img) => { 
        let myImg = img
        for (let newImg of myImg) { 
            delete newImg.url
        }
        return myImg
    }
        

    
    return (
        <Container sx={{display: 'flex', pt: '3vh'}}>
            <Box sx={{ width: '50%', textAlign: 'center', pt: '0.5rem' }}>
                {img[0] ? <img style={{ maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={'/' + img[0].url} alt='adImg' /> :
                <img style={{ maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={noImg} alt='noImg' />} <br />
                {img[0] &&
                    <Box sx={{ display: 'flex', maxWidth: '80%', ml: 'auto', mr: 'auto' }}>
                        <Grid container >
                            {img.map(image =>
                                <Grid item xs={4} key={image._id }>
                                    <img style={{ maxHeight: '10vh', borderRadius: '10px', border: '5px solid #402217', marginTop: '0.8rem' }} src={'/' + image.url} alt='adImg' />
                                </Grid>)}
                        </Grid>
                    </Box>}
                <CMyDropzoneForAds setImg={setImg} />
            </Box>
            <Box sx={{ pl: '1rem', width: '50%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Создать объявление</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4' }}
                    fullWidth={true}
                    label="Название"
                    onChange={e => {setTitle(e.target.value)}}
                    // value={title}
                />
                <TextField
                    sx={{ mb: '1rem', bgcolor: '#E9DFC4' }}
                    fullWidth={true}
                    label="Описание"
                    multiline={true}
                    minRows={4}
                    onChange={e => {setDescription(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', mr: '3%', bgcolor: '#E9DFC4' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddress(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', bgcolor: '#E9DFC4' }}   
                    label="Цена"
                    type="number"
                    onChange={e => {setPrice(+e.target.value)}}
                    // value={price}
                />
                <Button
                    fullWidth={true}
                    sx={{ bgcolor: 'primary', "&:hover": { bgcolor: 'secondary', opacity: '0.7' }, height: '3.5rem' }} variant='contained'
                    onClick={() => { 
                            onAdd(images(img), title, description, address, price)
                            myAds(store.getState().authReducer.payload.sub.id)
                            history.push(`/ads/${store.getState().authReducer.payload.sub.id}`)
                        }
                    }
                >
                    Опубликовать
                </Button>
            </Box>
        </Container>
    )
}
    
         
const СNewAd = connect(null, { onAdd: actionNewAd, myAds: actionMyAds })(NewAd)

export default СNewAd;