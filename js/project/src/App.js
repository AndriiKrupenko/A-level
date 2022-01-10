import store from './reducers';
import { Provider } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
import CMyDropzone from './components/DropeZone';
import СHeader from './components/Header';
import CMain from './components/Main';
import Footer from './components/Footer';

import logo from './logo.png';

import './App.scss';

// import {actionSearch } from './actions';

const history = createBrowserHistory()

export const historyPush = (url) => history.push(url)

export const Logo = () =>
<Link to="/" >
    <div><img src={logo} className="Logo" alt="logo" /></div>
</Link>

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <СHeader />
          <CMain />
          <CMyDropzone />
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;


