import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionAdById, actionSaveAd } from '../../actions';
import CMyDropzoneForAds from '../DropeZoneForAds';
import store from '../../reducers';
import { history } from '../../App';
import { Button, TextField, Box, Container, Typography } from '@mui/material/';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move'

import noImg from '../../no-img.png';

const SortableItem = sortableElement(({value}) => <li style={{ listStyleType: 'none', marginRight: '1rem' }}>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0', marginTop: '0' }}>{children}</ul>;
});

const AdEditor = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <CEntityEditor />
        </>
    )
}

const CAdEditor = connect(null, { getData: actionAdById })(AdEditor)

const EntityEditor = ({ ad: { _id, title, description, address, price, images }, onSave }) => {
    const [newTitle, setTitle] = useState(title)
    const [newDescription, setDescription] = useState(description)
    const [newAddress, setAddress] = useState(address)
    const [newPrice, setPrice] = useState(price)
    const [img, setImg] = useState(images)

    const imagesId = (img) => { 
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
            {img && img[0] && img[0].url && <Box sx={{ width: '14%', textAlign: 'center', pt: '0.5rem', "&:hover": {cursor: 'pointer'} }}>
                <SortableContainer onSortEnd={onSortEnd}>
                    {img.map((image, index) =>
                        <SortableItem key={image._id} index={index} value={
                            <img style={{ maxWidth: '90%', maxHeight: '15vh', borderRadius: '10px', border: '5px solid #402217', marginTop: '0.8rem' }} src={'/' + image.url} alt='adImg' />
                        } />)}
                </SortableContainer>
            </Box>}
            <Box sx={{ width: '43%', textAlign: 'center', pt: '0.5rem' }}>
                {img[0].url ? <img style={{ maxWidth: '90%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={'/' + img[0].url} alt='adImg' /> :
                <img style={{ maxWidth: '90%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217' }} src={noImg} alt='noImg' />}
                <CMyDropzoneForAds img={img} setImg={setImg} />
            </Box>
            <Box sx={{ pl: '1rem', width: '43%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Редактировать объявление</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Название"
                    onChange={e => {setTitle(e.target.value)}}
                    value={newTitle}
                />
                <TextField
                    sx={{ mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Описание"
                    multiline={true}
                    minRows={4}
                    onChange={e => {setDescription(e.target.value)}}
                    value={newDescription}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', mr: '3%', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddress(e.target.value)}}
                    value={newAddress}
                />
                <TextField
                    sx={{ width: '48.5%', mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}   
                    label="Цена"
                    type="number"
                    onChange={e => {setPrice(+e.target.value)}}
                    value={newPrice}
                />
                <Button
                    fullWidth={true}
                    sx={{ bgcolor: 'primary', "&:hover": { bgcolor: 'secondary', opacity: '0.7' }, height: '3.5rem' }} variant='contained'
                    onClick={() => { 
                            onSave(_id, imagesId(img), newTitle, newDescription, newAddress, newPrice)
                            history.push(`/ads/${store.getState().authReducer.payload.sub.id}`)
                        }
                    }
                >
                    Сохранить
                </Button>
            </Box>
        </Container>
    )
}

const CEntityEditor = connect(state => ({ad: state.promiseReducer.adById?.payload || []}), {onSave: actionSaveAd})(EntityEditor)

export default CAdEditor