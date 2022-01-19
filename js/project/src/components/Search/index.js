import { connect } from 'react-redux';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material/';
import { actionSearch } from '../../actions';
import CSearchResultList from '../SearchResultList/index.js'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const MySearch = ({ onSearch }) => { 
  const [inputValue, setInputValue] = useState('')

  return (
      <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => { 
              setInputValue(e.target.value)
              return onSearch(inputValue)
            }}
            value={inputValue}
          />
      <CSearchResultList clearSearchValue={() => setInputValue('')} searchValue={inputValue} />
      </Search>
    )
}

const CMySearch = connect(null, { onSearch: actionSearch })(MySearch)

export default CMySearch;