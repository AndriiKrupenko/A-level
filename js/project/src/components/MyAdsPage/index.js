import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { actionMyAds } from '../../actions';
import noImg from '../../no-img.png';

import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const MyAdsPage = ({  _id, myAds }) => { 
    useEffect(() => {
      myAds(_id)
    }, [])
    return (
        <>
            <CMyAds />
        </>
    )
}

const CMyAdsPage = connect(state => ({ _id: state.authReducer.payload.sub.id }), { myAds: actionMyAds })(MyAdsPage)

export const MyAd = ({ _id, owner, images, title, price}) =>
  <Grid item xs={12} md={3}>
    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: '3px 3px 3px #402217' }}>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <CardMedia component="img" sx={{height: 200}} image={'/' + images[0].url} alt='adImg' /> : <CardMedia component="img" sx={{height: 200}} image={noImg} alt='noImg' />}
      </Link>
      <CardContent sx={{ pt: '0', pb: '0' }}>
        <Typography variant='h6' align='justify' sx={{display: 'flex', width: '100%', justifyContent: 'space-between', mb: '-5px'}} >
          {title ? title : "unnamed"}
          <Link to={`/edit/${_id}`}>
            <Tooltip title="Редактировать">
              <EditIcon color='primary' sx={{mt: '5px', mr: '-10px'}} />
            </Tooltip>
          </Link>
        </Typography>
        <Typography variant='body2'>Автор: {owner.login}</Typography>
        {price ? <Typography sx={{ mt: '1rem' }} variant='body2'>Цена: <strong>{price} грн</strong></Typography>
          : <Typography sx={{ mt: '1rem' }} variant='body2'>Цена не указана</Typography>}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', pb: '2px' }}>
        <Link style={{ textDecoration: 'none' }} to={`/ad/${_id}`}>
          <Button sx={{ bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', opacity: '0.7'}, ml: '5px', mb: '10px' }} variant='contained'>Подробнее...</Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>


const MyAds = ({ myAds }) =>
  <>
    <Typography sx={{ textAlign: "center", pt: "1rem", pb: "1rem" }} variant='h4'>Мои объявления</Typography>
    { myAds && <Grid container spacing={3}>
      {Object.values(myAds).reverse().map((item) => <MyAd {...item} key={item._id}/> )}
    </Grid>}
    
  </>
const CMyAds = connect(state => ({ myAds: state.promiseReducer?.myAds?.payload } || {}) )(MyAds)

export default CMyAdsPage;