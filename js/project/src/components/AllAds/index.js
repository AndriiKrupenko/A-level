import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import noImg from '../../no-img.png';

const Ad = ({ _id, title, images, description, owner }) =>
  <li>
      <Link to={`/ad/${_id}`}>
        {images && images[0] && images[0].url ? <img src={'/' + images[0].url} alt='adImg' /> : <img src={noImg} alt='noImg' />}
      </Link>
      <div>
        <Link to={`/ad/${_id}`}>
            <h3>{title ? title : "unnamed"}</h3>
        </Link>
        {/* <span>{description ? description : "description none"}</span> */}
        <h4>Автор: {owner.login}</h4>
      </div>
  </li>

const AllAds = ({ ads }) =>
  <ul>
    {ads.map((item) => <Ad {...item} key={Math.random()}/> )}
  </ul>

const CAllAds = connect(state => ({ads: state.promiseReducer.allAds?.payload || []}))(AllAds)

export default CAllAds;