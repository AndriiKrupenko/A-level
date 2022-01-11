import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

import noImg from '../../no-img.png';

const Ad = ({ _id, title, images, description, owner }) =>
  <Grid item xs={12} md={3}>
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <CardMedia component="img" sx={{height: 200}} image={'/' + images[0].url} alt='adImg' /> : <CardMedia component="img" sx={{height: 200}} image={noImg} alt='noImg' />}
      </Link>
      <CardContent>
        <Typography variant='h6'>{title ? title : "unnamed"}</Typography>
        {/* <span>{description ? description : "description none"}</span> */}
        <Typography variant='body1'>Автор: {owner.login}</Typography>
      </CardContent>
      <CardActions>
        <Link style={{ textDecoration: 'none' }} to={`/ad/${_id}`}>
          <Button sx={{ bgcolor: '#4b0082', "&:hover": {bgcolor: '#4b0082', opacity: '0.7'} }} variant='contained'>Подробнее...</Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>

const AllAds = ({ ads }) =>
  <Grid container spacing={3}>
    {ads.map((item) => <Ad {...item} key={Math.random()}/> )}
  </Grid>

const CAllAds = connect(state => ({ads: state.promiseReducer.allAds?.payload || []}))(AllAds)

export default CAllAds;