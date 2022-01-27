import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionAboutMe, actionSaveUser, backURL } from '../../actions';
import CMyDropzone from '../../components/DropeZone';
import { history } from '../../App';

import { Button, TextField, Box, Container, Typography, Avatar } from '@mui/material/';

import noImg from '../../no-img.png';


const ProfileEditor = ({ aboutMe }) => { 
    useEffect(() => {
      aboutMe()
    }, [])
    return (
        <>
            <CEntityEditor />
        </>
    )
}

const CProfileEditor = connect(null, { aboutMe: actionAboutMe })(ProfileEditor)

const EntityEditor = ({ me: { _id, nick, avatar, phones, addresses }, onSave }) => {
    const [newNick, setNick] = useState(nick)
    const [newPhones, setPhones] = useState(phones)
    const [newAddresses, setAddresses] = useState(addresses)
        
    return (
        <Container sx={{display: 'flex', pt: '3vh', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', width: '25%', textAlign: 'center' }}>
                {avatar && avatar.url ? <Avatar alt="Мой аватар" variant='circular' src={`${backURL}/` + avatar.url} sx={{width: '30vh', height: '30vh', mr: '-1rem'}}/> : <Avatar alt="Мой аватар" src={noImg} sx={{width: '30vh', height: '30vh', mr: '-1rem'}} />}
                <CMyDropzone />
            </Box>
            <Box sx={{ pl: '1rem', width: '40%', textAlign: 'left' }}>
                <Typography variant='h5' color='primary' sx={{ textAlign: 'center', mb: '1rem' }}>Редактировать профиль</Typography>
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Ник"
                    onChange={e => {setNick(e.target.value)}}
                    value={newNick}
                />
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Телефон"
                    onChange={e => {setPhones([e.target.value])}}
                    // value={newPhones ? newPhones[0] : newPhones}
                />
                <TextField
                    sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '4px' }}
                    fullWidth={true}
                    label="Адрес"
                    onChange={e => {setAddresses([e.target.value])}}
                    // value={newAddresses ? newAddresses[0] : newAddresses}
                />
                <Button
                    fullWidth={true}
                    sx={{ bgcolor: 'primary', "&:hover": { bgcolor: 'secondary', opacity: '0.7' }, height: '3.5rem' }} variant='contained'
                    onClick={() => { 
                            onSave(_id, newNick, newPhones, newAddresses)
                            history.push(`/profile/${_id}`)
                        }
                    }
                >
                    Сохранить
                </Button>
            </Box>
        </Container>
    )
}

const CEntityEditor = connect(state => ({me: state.promiseReducer.aboutMe?.payload || []}), {onSave: actionSaveUser})(EntityEditor)

export default CProfileEditor

