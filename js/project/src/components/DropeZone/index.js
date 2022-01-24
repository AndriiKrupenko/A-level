import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
// import { actionUploadFile } from "../../actions"
import { connect } from 'react-redux';
import { actionSetAvatar } from '../../actions';
import { Tooltip, Button, TextField, Box, Container, Typography } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';


function MyDropzone({ onLoad }) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        // console.log(acceptedFiles)
        onLoad(acceptedFiles[0])
    }, [])

    
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <Tooltip title="Редактировать">
            <EditIcon color='primary' sx={{  width: 37, height: 37, cursor: 'pointer' }} />
          </Tooltip> 
          
      }
    </div>
  )
}

const CMyDropzone = connect(null, {onLoad: actionSetAvatar})(MyDropzone)
        
export default CMyDropzone
