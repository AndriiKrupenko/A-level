import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { actionAdById } from '../../actions';
import { connect } from 'react-redux';

import noImg from '../../no-img.png';

const AdPage = ({ match: { params: { _id } }, getData}) => { 
    useEffect(() => {
        getData(_id)
    }, [_id])
    return (
        <>
            <СAdPageCard />
        </>
    )
}

const CAdPage = connect(null, { getData: actionAdById })(AdPage)

const AdPageCard = ({ ad: { _id, title, images, description, price, owner, createdAt, address, tags, comments } }) => 
    <div className='adPage'>
      <div>
        {images && images[0] && images[0].url ? <img src={'/' + images[0].url} alt='adImg' /> : <img src={noImg} alt='noImg' />}
      </div>
      <div>
        <h3>{title ? title : "Unnamed"}</h3>
        <p><strong>Price: </strong>{price ? price : "No price"}</p>
        <p><strong>ID: </strong>{_id}</p>
        <p><strong>Description: </strong>{description ? description : "Description none"}</p>
        <p><strong>Created: </strong>{new Date(Number(createdAt)).toLocaleDateString("en-US")}</p>
        <p><strong>Address: </strong>{address ? address : "No address"}</p>
        {/* <p>{tags}</p> */}
        {/* <h6>{owner.login}</h6> */}
        {/* <p>{comments}</p> */}
      </div>
      </div>
         
const СAdPageCard = connect(state => ({ad: state.promiseReducer.adById?.payload || []}))(AdPageCard)

export default CAdPage;