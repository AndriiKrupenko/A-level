import { connect } from 'react-redux';
import React from 'react';
import { Typography } from '@mui/material';
import CircularIndeterminate from '../Progress'

function PromisePreloader({ children, name, reduxPromises }) {
    
    if (reduxPromises[name]) {
        if (reduxPromises[name].status === 'PENDING') {
            return <CircularIndeterminate />
        } else if (reduxPromises[name].status === 'RESOLVED') {
            return children
        } else {
            return <Typography sx={{ textAlign: "center", pt: "1rem", pb: "1rem" }} variant='h4'>{reduxPromises[name].error}</Typography>
        }
    } else { 
        return <CircularIndeterminate />
    }

}

const CPromisePreloader = connect(state => ({reduxPromises: state.promiseReducer}))(PromisePreloader)

export default CPromisePreloader

