import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material/';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import noImg from '../../no-img.png'

function SearchResultList({ searchResult, searchValue, clearSearchValue }) {
    // console.log(searchResult)
    return (
        <Box sx={{overflow: 'auto'}}>
            { searchResult && searchValue &&
            <List sx={{ position: 'absolute', width: 'calc(100% - 4px)', bgcolor: 'background.paper', border: '2px solid #4b0082', borderRadius: '5px' }} style={{maxHeight: '80vh', overflow: 'auto'}}>
                {searchResult[0] ? searchResult.map(item => 
                    <>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/ad/${item._id}`}
                            onClick={() => clearSearchValue()}
                        >
                            <ListItem alignItems="flex-start" key={item._id}>
                                <ListItemAvatar>
                                    { item?.images?.[0]?.url ? <Avatar alt={item?.title} src={'/' + item?.images?.[0]?.url} /> : <Avatar alt={item?.title} src={noImg} />}
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ mt: '0', mb: '0' }}
                                    primary={
                                        <Typography
                                            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            { item.title ? <span>{item.title}</span> : <span>Unnamed</span> }
                                            { item.price ? <span>{item.price} грн.</span> : <span>Цена не указана</span> }
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"   
                                        >
                                            { item?.description }
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                        <Divider sx={{ mr: '2%'}} variant="inset" component="li" />
                    </>
                    ) : 
                    <ListItem alignItems="flex-start">
                        <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                        >
                            Объявления не найдены
                        </Typography>
                    </ListItem>
                }
                {searchResult[0] && <Box sx={{mt: '10px', mr: '2%', textAlign: 'right'}}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/search`}
                        onClick={() => clearSearchValue()}
                    >
                        <Button sx={{ bgcolor: '#4b0082', "&:hover": {bgcolor: '#4b0082', opacity: '0.7'}, ml: '5px', mb: '0' }} variant='contained'>Показать все результаты</Button>
                    </Link>
                </Box>}
            </List>}
        </Box>
    )
}

const CSearchResultList = connect( state => ({ searchResult: state.searchReducer.searchResult?.payload.payload || '' }))(SearchResultList)

export default CSearchResultList;