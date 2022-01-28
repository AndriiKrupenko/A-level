import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actionAdById, actionAddComment, backURL } from '../../actions';

import { Box, Button, Container, Divider, Typography, TextField } from '@mui/material';

import noImg from '../../no-img.png';

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

const AdPageCard = ({ ad: { _id, title, images, description, price, createdAt, address, comments }, status, comm, addComment }) => {
    const [mainImg, setMainImg] = useState((images && images[0] && images[0].url) || '')
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (status.status === 'RESOLVED') { 
            if (status.payload.images && status.payload.images[0] && status.payload.images[0].url) {
                
                setMainImg(status.payload.images[0].url)
            } else { 
                setMainImg('')
            }
        }
    }, [status.status, comm])

    return (
        <Container sx={{ display: 'flex', pt: '3vh', justifyContent: 'center', alignItems: 'flex-start' }}>
            {images && images[0] && images[0].url && <Box sx={{  width: '14%', backgroundColor: '#E9DFC4', border: '3px solid #402217', borderRadius: '10px', textAlign: 'center', pl: '0.5rem', pr: '0.5rem', pt: '0.2rem', pb: '0.8rem', mt: '1rem', mr: '1rem', "&:hover": {cursor: 'pointer'} }}>
                {images.map(image =>
                    <img key={image._id} style={{ cursor: 'pointer', maxHeight: '10vh', borderRadius: '10px', boxShadow: '3px 3px 3px #402217', marginTop: '0.8rem' }} src={`${backURL}/` + image.url} alt='adImg' onClick={() => setMainImg(image.url)} />)}
            </Box>}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', width: '86%', pt: '1rem', justifyContent: 'center' }}>
                <Box sx={{ backgroundColor: '#E9DFC4', border: '3px solid #402217', borderRadius: '10px', width: '48%', textAlign: 'center', pt: '1rem', pb: '1rem' }}>
                    {mainImg ? <img style={{maxWidth: '90%', maxHeight: '35vh', borderRadius: '10px', boxShadow: '3px 3px 3px #402217' }} src={`${backURL}/` + mainImg} alt='adImg' /> : <img style={{maxWidth: '100%', maxHeight: '35vh', borderRadius: '10px', boxShadow: '3px 3px 3px #402217', color: '#FFF8DC'}} src={noImg} alt='noImg' />}
                </Box>
                <Box sx={{ pl: '1rem', width: '49%', textAlign: 'left' }}>
                    <Typography variant='h4' sx={{ pb: '1rem' }}>
                        {title ? title : "Unnamed"}
                    </Typography>
                    <Divider />
                    <Typography variant='body1' paragraph={true} sx={{ pt: '1rem' }}>
                        <strong>ID: </strong>{_id}
                    </Typography>
                    <Typography variant='body1' paragraph={true}>
                        <strong>Description: </strong>{description ? description : "Description none"}
                    </Typography>
                    <Typography variant='body1' paragraph={true}>
                        <strong>Price: </strong>{price ? price : "No price"}
                    </Typography>
                    <Typography variant='body2' paragraph={true}>
                        <strong>Created: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}
                    </Typography>
                    <Typography variant='body2' paragraph={true}>
                        <strong>Address: </strong>{address ? address : "No address"}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', mt: '1rem' }}>
                    <TextField
                        sx={{  mb: '1rem', bgcolor: '#E9DFC4', borderRadius: '10px', width: '73%' }}
                        multiline={true}
                        minRows={1}
                        label="Оставьте комментарий"
                        onChange={e => { setComment(e.target.value) }}
                        value={comment}
                    />
                    <Button sx={{ bgcolor: 'primary', "&:hover": { bgcolor: 'secondary', opacity: '0.7' }, height: '3.4rem', mb: '1.1rem', ml: '1rem' }} variant='contained' onClick={() => { addComment(_id, comment); setComment('') }}>Добавить комментарий</Button>
                </Box>
                
                {comments && comments[0] && comments[0].text &&
                    <Box sx={{ width: '100%', backgroundColor: '#E9DFC4', border: '3px solid #402217', borderRadius: '10px', p: '1rem 1rem 0.2rem 1rem' }}>
                        <Typography variant='h6' paragraph={true} sx={{ ml: '0', mt: '0.2rem' }}>Комментарии:</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column-reverse', flexWrap: 'wrap'}}>
                        {comments && comments[0] && comments[0].text && comments.map(comment =>
                            <Box key={comment._id} sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', mb: '1rem' }}>
                                <Box sx={{ width: '18%', overflow: 'hidden' }}>
                                    <Typography variant='body1' paragraph={true}>{comment.owner.login}:</Typography>
                                </Box>
                                <Box sx={{ width: '82%', backgroundColor: '#fff8dc', borderRadius: '10px', boxShadow: '3px 3px 3px #402217', }}>
                                    <Typography variant='body1' paragraph={true} sx={{ ml: '0.5rem', mt: '0.2rem' }}>{comment.text}</Typography>
                                </Box>
                            </Box>
                        )}
                        </Box>
                    </Box>
                }
            </Box>
            
        </Container>
    )
}
  
         
const СAdPageCard = connect(state => ({ ad: state.promiseReducer.adById?.payload || [], status: state.promiseReducer.adById || {}, comm: state.promiseReducer?.addComment?.payload || [] }), {addComment: actionAddComment})(AdPageCard)

export default CAdPage;










