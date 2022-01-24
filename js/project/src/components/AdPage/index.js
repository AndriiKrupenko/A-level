import { useEffect } from 'react';
import { actionAdById } from '../../actions';
import { connect } from 'react-redux';

import noImg from '../../no-img.png';

import { Box, Container, Divider, Typography, Grid } from '@mui/material';

const AdPage = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <СAdPageCard />
        </>
    )
}

const CAdPage = connect(null, { getData: actionAdById })(AdPage)

const AdPageCard = ({ ad: { _id, title, images, description, price, owner, createdAt, address, tags, comments } }) => 
  <Container sx={{display: 'flex', pt: '3vh'}}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        {images && images[0] && images[0].url ? <img style={{maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217'}} src={'/' + images[0].url} alt='adImg' /> : <img style={{maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', border: '5px solid #402217', color: '#FFF8DC'}} src={noImg} alt='noImg' />}
        {images && images[0] &&
                    <Box sx={{ display: 'flex', maxWidth: '80%', ml: 'auto', mr: 'auto' }}>
                        <Grid container >
                            {images.map(image =>
                                <Grid item xs={4} key={image._id }>
                                    <img style={{ maxHeight: '10vh', borderRadius: '10px', border: '5px solid #402217', marginTop: '0.8rem' }} src={'/' + image.url} alt='adImg' />
                                </Grid>)}
                        </Grid> 
                    </Box>}
      </Box>
      
      <Box sx={{ pl: '1rem', width: '50%', textAlign: 'left' }}>
      <Typography variant='h3' sx={{pb: '1rem'}}>{title ? title : "Unnamed"}</Typography>
      <Divider />
      <Typography variant='body1' paragraph={true} sx={{pt: '1rem'}}><strong>ID: </strong>{_id}</Typography>
      <Typography variant='body1' paragraph={true}><strong>Description: </strong>{description ? description : "Description none"}</Typography>
      <Typography variant='body1' paragraph={true}><strong>Price: </strong>{price ? price : "No price"}</Typography>
      <Typography variant='body2' paragraph={true}><strong>Created: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}</Typography>
      <Typography variant='body2' paragraph={true}><strong>Address: </strong>{address ? address : "No address"}</Typography>
      {/* <Typography variant='body2' paragraph={true}><strong>Owner: </strong>{owner.login}</Typography> */}
        {/* <p>{tags}</p> */}
        {/* <p>{comments}</p> */}
      </Box>
    </Container>
         
const СAdPageCard = connect(state => ({ad: state.promiseReducer.adById?.payload || []}))(AdPageCard)

export default CAdPage;