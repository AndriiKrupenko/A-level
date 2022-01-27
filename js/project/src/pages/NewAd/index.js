import { useState } from 'react';
import { connect } from 'react-redux';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import store from '../../reducers';
import { actionNewAd, backURL } from "../../actions";
import { history } from '../../App';
import CMyDropzoneForAds from '../../components/DropeZoneForAds';

import { Button, TextField, Box, Container, Typography } from '@mui/material/';

import noImg from '../../no-img.png';

const SortableItem = sortableElement(({value}) => <li style={{ listStyleType: 'none', marginRight: '1rem' }}>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0', marginTop: '0' }}>{children}</ul>;
});

const NewAd = ({ onAdd }) => { 
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
            {img[0] && <Box sx={{ width: '14%', backgroundColor: '#E9DFC4', border: '3px solid #402217', borderRadius: '10px', textAlign: 'center', pl: '0.8rem', pt: '0.2rem', pb: '0.8rem', mt: '0.5rem', mr: '1rem', "&:hover": {cursor: 'pointer'} }}>
                <SortableContainer onSortEnd={onSortEnd}>
                    {img.map((image, index) =>
                        <SortableItem key={image._id} index={index} value={
                            <img style={{ maxWidth: '90%', maxHeight: '15vh', borderRadius: '10px', boxShadow: '3px 3px 3px #402217', marginTop: '0.8rem' }} src={`${backURL}/` + image.url} alt='adImg' />
                        } />)}
                </SortableContainer>
            </Box>}
            <Box sx={{ width: '43%', textAlign: 'center', pt: '0.5rem' }}>
                <Box sx={{ backgroundColor: '#E9DFC4', border: '3px solid #402217', borderRadius: '10px', pt: '1rem', pb: '1rem' }}>
                    {img[0] ? <img style={{ maxWidth: '90%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={`${backURL}/` + img[0].url} alt='adImg' /> :
                    <img style={{ maxWidth: '90%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={noImg} alt='noImg' />}
                </Box>
                <CMyDropzoneForAds img={img} setImg={setImg} />
            </Box>
            <Box sx={{ pl: '1rem', width: '43%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Создать объявление</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Название"
                    onChange={e => {setTitle(e.target.value)}}
                />
                <TextField
                    sx={{ mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Описание"
                    multiline={true}
                    minRows={4}
                    onChange={e => {setDescription(e.target.value)}}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', mr: '3%', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddress(e.target.value)}}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}   
                    label="Цена"
                    type="number"
                    onChange={e => {setPrice(+e.target.value)}}
                />
                <Button
                    fullWidth={true}
                    sx={{ bgcolor: 'primary', "&:hover": { bgcolor: 'secondary', opacity: '0.7' }, height: '3.5rem' }} variant='contained'
                    onClick={() => { 
                            onAdd(images(img), title, description, address, price)
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
    
         
const СNewAd = connect(null, { onAdd: actionNewAd })(NewAd)

export default СNewAd;