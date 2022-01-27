import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionFavoriteRemove, backURL } from '../../actions';

import { Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton, Typography, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import noImg from '../../no-img.png';

export const FavoriteAd = ({ _id, owner, images, title, price, onRemove}) =>
  <Grid item xs={12} md={3}>
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
          <Tooltip title="Удалить из избранных">
            <IconButton
              onClick={() => onRemove({ _id })}
              size="large"
              color="inherit"
            >
              <FavoriteIcon sx={{ color: "primary", width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
      </CardActions>
    </Card>
  </Grid>

const CFavoriteAd = connect(null, { onRemove: actionFavoriteRemove })(FavoriteAd)

const Favorite = ({ fav }) =>
  <>
    <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>Избранные объявления</Typography>
    <Grid container spacing={3}>
      {Object.values(fav).reverse().map((item) => <CFavoriteAd {...item} key={Math.random()}/> )}
    </Grid>
  </>
const CFavorite = connect(state => ({fav: state.favoriteReducer}))(Favorite)

export default CFavorite;