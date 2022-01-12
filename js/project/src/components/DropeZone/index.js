import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
// import { actionUploadFile } from "../../actions"
import { connect } from 'react-redux';
import { actionSetAvatar } from '../../actions';


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
          <button>Load file</button>
          
      }
    </div>
  )
}

const CMyDropzone = connect(null, {onLoad: actionSetAvatar})(MyDropzone)
        
export default CMyDropzone