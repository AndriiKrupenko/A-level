import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { actionUploadFiles } from '../../actions';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '86%',
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

function MyDropzoneForAds({ img, setImg, onLoad, fileStatus }) {

  const checkRef = useRef(0)

  useEffect(() => {
    if (!checkRef.current) { 
    } else if (fileStatus.status === 'RESOLVED') { 
        setImg([...img, ...fileStatus.payload])
    }
    checkRef.current++
    }, [fileStatus.status])

  const onDrop = useCallback(acceptedFiles => {
    onLoad(acceptedFiles)
  }, [])

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


  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone', style})}>
        <input {...getInputProps()} />
        <p>Переместите изображения в область для загрузки или нажмите, чтобы выбрать.</p>
      </div>
    </section>
  );
}

const CMyDropzoneForAds = connect(state => ({ fileStatus: state.promiseReducer.photos || {}}), {onLoad: actionUploadFiles})(MyDropzoneForAds)
        
export default CMyDropzoneForAds