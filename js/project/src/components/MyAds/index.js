import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import noImg from '../../no-img.png';

import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

export const MyAd = ({ _id, owner, images, title, price, onRemove}) =>
  <Grid item xs={12} md={3}>
    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: '3px 3px 3px gray' }}>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <CardMedia component="img" sx={{height: 200}} image={'/' + images[0].url} alt='adImg' /> : <CardMedia component="img" sx={{height: 200}} image={noImg} alt='noImg' />}
      </Link>
      <CardContent sx={{ pt: '0', pb: '0' }}>
        <Typography variant='h6'>{title ? title : "unnamed"}</Typography>
        <Typography variant='body2'>Автор: {owner.login}</Typography>
        {price ? <Typography sx={{ mt: '1rem' }} variant='body2'>Цена: <strong>{price} грн</strong></Typography>
          : <Typography sx={{ mt: '1rem' }} variant='body2'>Цена не указана</Typography>}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', pb: '2px' }}>
        <Link style={{ textDecoration: 'none' }} to={`/ad/${_id}`}>
          <Button sx={{ bgcolor: '#4b0082', "&:hover": {bgcolor: '#4b0082', opacity: '0.7'}, ml: '5px', mb: '10px' }} variant='contained'>Подробнее...</Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>


const MyAds = ({ myAds }) =>
  <>
    <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>Мои объявления</Typography>
    <Grid container spacing={3}>
      {Object.values(myAds).reverse().map((item) => <MyAd {...item} key={item._id}/> )}
    </Grid>
  </>
const CMyAds = connect(state => ({myAds: state.promiseReducer.myAds?.payload}))(MyAds)

export default CMyAds;