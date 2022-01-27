import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionFavoriteAdd, actionFavoriteRemove, actionFeedStart, actionFeedClear, backURL } from '../../actions';
import CPromisePreloader from '../../components/PromisePreloader';

import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Tooltip, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import noImg from '../../no-img.png';

const AllAdsPage = ({ initialFeed, clearFeed }) => { 
    useEffect(() => {
      initialFeed()
      return () => clearFeed()
    }, [])
    return (
        <>
            <CAllAds />
        </>
    )
}

const CAllAdsPage = connect(null, { initialFeed: actionFeedStart, clearFeed: actionFeedClear })(AllAdsPage)

const Ad = ({ _id, owner, images, title, price, fav, onAdd, onRemove}) =>
  <Grid item xs={12} md={3} sx={{bgcolor: 'secondary'}}>
    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: '3px 3px 3px #402217' }}>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <CardMedia component="img" sx={{height: 200}} image={`${backURL}/` + images[0].url} alt='adImg' /> : <CardMedia component="img" sx={{height: 200}} image={noImg} alt='noImg' />}
      </Link>
      <CardContent sx={{ pt: '0', pb: '0' }}>
        <Typography variant='h6'>{title ? title : "unnamed"}</Typography>
        <Typography variant='body2'>Автор: {owner.login}</Typography>
        {price ? <Typography sx={{ mt: '1rem' }} variant='body2'>Цена: <strong>{price} грн</strong></Typography>
          : <Typography sx={{ mt: '1rem' }} variant='body2'>Цена не указана</Typography>}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', pb: '2px' }}>
        <Link style={{ textDecoration: 'none' }} to={`/ad/${_id}`}>
          <Button sx={{ bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', opacity: '0.7'}, ml: '5px', mb: '0' }} variant='contained'>Подробнее...</Button>
        </Link>
          {fav[_id] ?
            <Tooltip title="Удалить из избранных">
              <IconButton
                onClick={() => onRemove({ _id })}
                size="large"
                color="inherit"
              >
                <FavoriteIcon sx={{ color: "primary", width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
            :
            <Tooltip title="В избранные">
              <IconButton
                onClick={() => onAdd({ _id, title, images, price, owner })}
                size="large"
                color="inherit"
              >
                <FavoriteBorderIcon sx={{ color: "primary", width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          }
        
      </CardActions>
    </Card>
  </Grid>

export const CAd = connect(state => ({ fav: state.favoriteReducer }), { onAdd: actionFavoriteAdd, onRemove: actionFavoriteRemove })(Ad)

const AllAds = ({ ads, newFeed }) =>
  <>
    <Grid container spacing={3}>
      {ads.map((item) => <CAd {...item} key={Math.random()}/> )}
    </Grid>
    <CPromisePreloader name='feedAds'>
      <Box sx={{ width: '100%', textAlign: 'center', mt: '2rem' }}>
        <Button onClick={() => newFeed()} sx={{ bgcolor: 'primary', "&:hover": {bgcolor: 'secondary', opacity: '0.7'} }} variant='contained'>Загрузить ещё...</Button>
      </Box>
    </CPromisePreloader>
  </>

const CAllAds = connect(state => ({ads: state.feedReducer || []}), { newFeed: actionFeedStart })(AllAds)

export default CAllAdsPage;