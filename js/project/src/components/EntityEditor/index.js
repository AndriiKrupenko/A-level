import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionAdById } from '../../actions';
import CMyDropzoneForAds from '../DropeZoneForAds';

import noImg from '../../no-img.png';

const AdEditor = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <CEntityEditor />
        </>
    )
}

const CAdEditor = connect(null, { getData: actionAdById })(AdEditor)

const EntityEditor = ({ entity = { array: [] }, onSave, onFileDrop, fileStatus }) => {
    const [images, setImages] = useState(entity)

    return <CMyDropzoneForAds setImg={setImages} />
    //по файлу в дропзоне:
        //дергать onFileDrop
        //fileStatus - информация о заливке файла из redux
        //через useEffect дождаться когда файл зальется
        //и сделать setState({...state, array: [...state.array, {объект файла с бэка с _id и url}]})
    //по react-sortable-hoc
        //делаете как в пример arrayMove для state.array
    //по кнопке сохранения делаем onSave(state)
    //где-то рядом остальные поля из state типа title name text
    //но это вы уже знаете
}

const CEntityEditor = connect(state => ({ entity: { array: (state.promiseReducer.adById?.payload || []) }}))(EntityEditor)

export default CAdEditor