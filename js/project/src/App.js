import store from './reducers';
import { Provider } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
import СHeader from './components/Header';
import CMain from './components/Main';
import Footer from './components/Footer';

import logo from './logo.png';

import './App.scss';

// import {actionSearch } from './actions';

export const history = createBrowserHistory()

export const Logo = () =>
<Link to="/" >
    <img src={logo} className="Logo" alt="logo" />
</Link>

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <СHeader />
          <CMain />
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;


