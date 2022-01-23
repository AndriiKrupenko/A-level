import { connect } from 'react-redux';
import { useState } from 'react';
import store from '../../reducers';
import { actionNewAd, actionMyAds } from "../../actions";
import { history } from '../../App';
import { Button, TextField } from '@mui/material/';
import CMyDropzoneForAds from '../DropeZoneForAds';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move'

import noImg from '../../no-img.png';

import { Box, Container, Typography, Grid } from '@mui/material';

const SortableItem = sortableElement(({value}) => <li style={{ listStyleType: 'none', marginRight: '1rem' }}>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0', marginTop: '0' }}>{children}</ul>;
});

const NewAd = ({ onAdd, myAds }) => { 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState([])

    const images = (img) => { 
        let myImg = img
        for (let newImg of myImg) { 
            delete newImg.url
        }
        return myImg
    }
        
    const onSortEnd = ({oldIndex, newIndex}) => {
        setImg(arrayMoveImmutable(img, oldIndex, newIndex))
    }
    
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', pt: '3vh' }}>
            {img[0] && <Box sx={{ width: '14%', textAlign: 'center', pt: '0.5rem' }}>
                <SortableContainer onSortEnd={onSortEnd}>
                    {img.map((image, index) =>
                        <SortableItem key={image._id} index={index} value={
                            <img style={{ maxHeight: '10vh', borderRadius: '10px', border: '5px solid #402217', marginTop: '0.8rem', }} src={'/' + image.url} alt='adImg' />
                        } />)}
                </SortableContainer>
            </Box>}
            <Box sx={{ width: '43%', textAlign: 'center', pt: '0.5rem' }}>
                {img[0] ? <img style={{ maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={'/' + img[0].url} alt='adImg' /> :
                <img style={{ maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={noImg} alt='noImg' />}
                <CMyDropzoneForAds setImg={setImg} />
            </Box>
            <Box sx={{ pl: '1rem', width: '43%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Создать объявление</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Название"
                    onChange={e => {setTitle(e.target.value)}}
                    // value={title}
                />
                <TextField
                    sx={{ mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Описание"
                    multiline={true}
                    minRows={4}
                    onChange={e => {setDescription(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', mr: '3%', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddress(e.target.value)}}
                    // value={description}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}   
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