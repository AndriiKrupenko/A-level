import { connect } from 'react-redux';

function PromisePreloader({ children, name, reduxPromises }) {

    // const promise = Object.keys(reduxPromises).filter(item => item === name)

    if (reduxPromises[name]) { 
        if (reduxPromises.name.status === 'PENDING') {
            return < img src='/project/src/logoOld.png' />
        } else if (reduxPromises.name.status === 'RESOLVED') {
            return { children }
        } else { 
            return <p>Error!</p>
        }
    }

    // return (
    //     <div>
            
    //     </div>
    // )
}

const CPromisePreloader = connect(state => ({reduxPromises: state.promiseReducer}))(PromisePreloader)

export default CPromisePreloader


// const PromisePreloader = ({ children, name, reduxPromises }) => {
//     //чекаем reduxPromises на предмет `name`
//     //чекаем статус
//     //разбираемся с условными операторами
//     //которые возвращают разную верстку в зависимости от
//     //статуса
// }

// const CPromisePreloader = connect(state => ({reduxPromises: state.promise}))(PromisePreloader)

// ......
// <CPromisePreloader name='rootCats'>
//     <CRootCats/>
// </CPromisePreloader>