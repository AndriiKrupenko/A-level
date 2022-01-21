import { connect } from 'react-redux';
import { useState } from 'react';
import store from '../../reducers';
import { actionNewAd, actionMyAds } from "../../actions";
import { history } from '../../App';
import { Button, TextField } from '@mui/material/';
import CMyDropzoneForAds from '../DropeZoneForAds';

import noImg from '../../no-img.png';

import { Box, Container, Typography } from '@mui/material';

const NewAd = ({ onAdd, myAds }) => { 
    // title, description, address, price
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState(null)

    return (
        <Container sx={{display: 'flex', pt: '3vh'}}>
            <Box sx={{ width: '50%', textAlign: 'center' }}>
                {img ? <img style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '10px' }} src={'/' + img.url} alt='adImg' /> :
                    <img style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '10px' }} src={noImg} alt='noImg' />}
                <CMyDropzoneForAds setImg={ setImg } />
            </Box>
            <Box sx={{ pl: '1rem', width: '50%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Создать объявление</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: 'white' }}
                    fullWidth={true}
                    label="Название"
                    onChange={e => {setTitle(e.target.value)}}
                    // value={title}
                />
                <TextField
                    sx={{ mb: '1rem', bgcolor: 'white' }}
                    fullWidth={true}
                    label="Описание"
                    multiline={true}
                    minRows={4}
                    onChange={e => {setDescription(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', mr: '3%', bgcolor: 'white' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddress(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', bgcolor: 'white' }}   
                    label="Цена"
                    type="number"
                    onChange={e => {setPrice(+e.target.value)}}
                    // value={price}
                />
                <Button
                    fullWidth={true}
                    sx={{ bgcolor: '#4b0082', "&:hover": { bgcolor: '#4b0082', opacity: '0.7' }, height: '3.5rem' }} variant='contained'
                    onClick={() => { 
                            onAdd(img._id, title, description, address, price)
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