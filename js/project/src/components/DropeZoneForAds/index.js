import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { actionUploadFile } from '../../actions';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '74%',
  alignItems: 'center',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '30px',
  borderWidth: 3,
  borderRadius: 10,
  borderColor: '#290302',
  borderStyle: 'dashed',
  backgroundColor: '#E9DFC4',
  color: '#290302',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#F99F00'
};

const acceptStyle = {
  borderColor: '#290302'
};

const rejectStyle = {
  borderColor: 'red'
};

function MyDropzoneForAds({ setImg, onLoad, fav }) {

  let imagesToAd = []

  const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    acceptedFiles.map(async file => await (onLoad(file).promise.then(res => imagesToAd.push(res))))
    
    setImg(imagesToAd)
  }, [])
  
  // const onDrop = useCallback(acceptedFiles => {
  //       // Do something with the files
  //   acceptedFiles.map(async file => await (onLoad(file).promise.then(res => imagesToAd.push(res))))
    
  //   setImg(imagesToAd)
  //   }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {/* {file.path} - {file.size} bytes */}
  //     {/* { console.log(file) } */}
  //   </li>
  // ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone', style})}>
        <input {...getInputProps()} />
        <p>Перетащите изображения в область для загрузки или нажмите, чтобы выбрать.</p>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        { console.log(files)}
      </aside> */}
    </section>
  );
}

const CMyDropzoneForAds = connect(null, {onLoad: actionUploadFile})(MyDropzoneForAds)
        
export default CMyDropzoneForAds