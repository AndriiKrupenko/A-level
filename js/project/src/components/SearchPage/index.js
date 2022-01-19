import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionFavoriteAdd, actionFavoriteRemove, actionSearch } from '../../actions';

import noImg from '../../no-img.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton, Typography, Tooltip } from '@mui/material';

const SearchPage = ({ match: { params: { searchText } }, getData}) => { 
    useEffect(() => {
        getData(searchText)
    }, [searchText])
    return (
        <>
            <CSearchPageInit />
        </>
    )
}

const CSearchPage = connect(null, { getData: actionSearch })(SearchPage)


const SearchAd = ({ _id, owner, images, title, price, fav, onAdd, onRemove}) =>
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
          <Button sx={{ bgcolor: '#4b0082', "&:hover": {bgcolor: '#4b0082', opacity: '0.7'}, ml: '5px', mb: '0' }} variant='contained'>Подробнее...</Button>
        </Link>
          {fav[_id] ?
            <Tooltip title="Удалить из избранных">
              <IconButton
                onClick={() => onRemove({ _id })}
                size="large"
                color="inherit"
              >
                <FavoriteIcon sx={{ color: "#4b0082", width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
            :
            <Tooltip title="В избранные">
              <IconButton
                onClick={() => onAdd({ _id, title, images, price, owner })}
                size="large"
                color="inherit"
              >
                <FavoriteBorderIcon sx={{ color: "#4b0082", width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          }
      </CardActions>
    </Card>
  </Grid>

export const CSearchAd = connect(state => ({ fav: state.favoriteReducer }), { onAdd: actionFavoriteAdd, onRemove: actionFavoriteRemove })(SearchAd)


const SearchPageInit = ({ searchResult }) =>
    <> 
    {console.log(searchResult)}
    <Typography sx={{textAlign: "center", pt: "1rem", pb: "1rem"}} variant='h4'>Результаты поиска</Typography>
    <Grid container spacing={3}>
      {Object.values(searchResult).map((item) => <CSearchAd {...item} key={item._id}/> )}
    </Grid>
  </>
const CSearchPageInit = connect(state => ({searchResult: state.searchReducer.searchResult?.payload.payload || []}))(SearchPageInit)

export default CSearchPage;