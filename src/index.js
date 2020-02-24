import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Product from './components/Product';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

const AppWithRouter = () => (
    <Router>
      {/* <Route path="/" exact component={App} /> localhost:3000/ */}
      <Route path="/" exact component={Product} /> {/* localhost:3000/profile */}
      <Route path="/edit/:id" component={EditProduct} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
  
  const AppWithRedux = () => (
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  );

ReactDOM.render(<AppWithRedux />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
