import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux';
import { actionUploadFile } from '../../actions';

function MyDropzoneForAds({setImg, onLoad}) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      onLoad(acceptedFiles[0]).promise.then(res => setImg(res))
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

const CMyDropzoneForAds = connect(null, {onLoad: actionUploadFile})(MyDropzoneForAds)
        
export default CMyDropzoneForAds