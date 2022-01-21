import { connect } from 'react-redux';
import { useEffect } from 'react';
import CMyDropzone from '../DropeZone';

import { actionAboutMe } from '../../actions';

import noImg from '../../no-img.png';

import { Box, Container, Typography, Divider } from '@mui/material';

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

const MyProfile = ({ me: { _id, login, nick, avatar, createdAt, incomings, phones,  addresses } }) => 
  <Container sx={{display: 'flex', pt: '3vh'}}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        {avatar && avatar.url ? <img style={{maxWidth: '100%', maxHeight: '70vh', borderRadius: '10px'}} src={'/' + avatar.url} alt='adImg' /> : <img style={{maxWidth: '100%', maxHeight: '70vh', borderRadius: '10px'}} src={noImg} alt='noImg' />}
        <CMyDropzone />
      </Box>
      <Box sx={{ pl: '1rem', width: '50%', textAlign: 'left' }}>
        <Typography variant='h3' sx={{pb: '1rem'}}>{nick ? nick : "Unnamed"}</Typography>
        <Divider />
        <Typography variant='body1' paragraph={true} sx={{pt: '1rem'}}><strong>ID: </strong>{_id}</Typography>
        <Typography variant='body1' paragraph={true}><strong>Login: </strong>{login}</Typography>
        <Typography variant='body1' paragraph={true}><strong>Nick: </strong>{nick}</Typography>
        <Typography variant='body2' paragraph={true}><strong>Created: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}</Typography>
        {/* <p>{incomings}</p> */}
        {/* <h6>{phones}</h6> */}
        {/* <p>{addresses}</p> */}
      </Box>
  </Container>
         
const CMyProfile = connect(state => ({me: state.promiseReducer.aboutMe?.payload || []}))(MyProfile)

export default CMyProfilePage;