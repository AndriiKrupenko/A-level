import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import CMyDropzone from '../DropeZone';

import { actionAboutMe } from '../../actions';

import noImg from '../../no-img.png';

import { Avatar, Box, Container, Typography, Divider, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const MyProfilePage = ({ aboutMe }) => { 
    useEffect(() => {
      aboutMe()
    }, [])
    return (
        <>
            <CMyProfile />
        </>
    )
}

const CMyProfilePage = connect(null, { aboutMe: actionAboutMe })(MyProfilePage)

const MyProfile = ({ me: { _id, login, nick, avatar, createdAt, phones, addresses } }) => 
  <Container sx={{display: 'flex', pt: '3vh', justifyContent: 'center'}}>
      <Box sx={{ display: 'flex', width: '25%', textAlign: 'center' }}>
        {avatar && avatar.url ? <Avatar alt="Мой аватар" variant='circular' src={'/' + avatar.url} sx={{width: '30vh', height: '30vh', mr: '-1rem'}}/> : <Avatar alt="Мой аватар" src={noImg} sx={{width: '30vh', height: '30vh', mr: '-1rem'}} />}
        <CMyDropzone />
      </Box>
      <Box sx={{ pl: '2rem', width: '35%', textAlign: 'left' }}>
        <Typography variant='h4' sx={{display: 'flex', justifyContent: 'space-between', pb: '1rem'}}>
          {nick ? nick : "Unnamed"}
          <Link to={`/editprofile/${_id}`}>
            <Tooltip title="Редактировать">
              <EditIcon color='primary' sx={{width: 37, height: 37 }} />
            </Tooltip>
          </Link>
        </Typography>
        <Divider />
        <Typography variant='body1' paragraph={true} sx={{pt: '1rem'}}><strong>ID: </strong>{_id}</Typography>
        <Typography variant='body1' paragraph={true}><strong>Логин: </strong>{login}</Typography>
        <Typography variant='body1' paragraph={true}><strong>Телефон: </strong>{
        (phones && phones[0]) ? <span>{phones[0]}</span> : <span>Телефон не указан</span>
        }</Typography>
        <Typography variant='body1' paragraph={true}><strong>Адрес: </strong>{
        (addresses && addresses[0]) ? <span>{addresses[0]}</span> : <span>Адрес не указан</span>
          }</Typography>
        <Typography variant='body1' paragraph={true}><strong>На сайте с: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}</Typography>
      </Box>
  </Container>
         
const CMyProfile = connect(state => ({me: state.promiseReducer.aboutMe?.payload || []}))(MyProfile)

export default CMyProfilePage;