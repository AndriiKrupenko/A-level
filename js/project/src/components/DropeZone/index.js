import React, {useCallback} from 'react'
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { actionSetAvatar } from '../../actions';
import { Tooltip } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';


function MyDropzone({ onLoad }) {
    const onDrop = useCallback(acceptedFiles => {

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
