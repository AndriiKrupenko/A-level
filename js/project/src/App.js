import store from './reducers';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { createBrowserHistory } from "history";
import СHeader from './components/Header';
import CMain from './components/Main';
import Footer from './components/Footer';

// ---------old style import------------
// import './App.scss'; 

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App" style={{background: 'linear-gradient(to bottom right, #c5b29a 0%, #b37041 100%)'}}>
          <СHeader />
          <CMain />
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;


