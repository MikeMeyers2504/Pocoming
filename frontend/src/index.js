import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore'; 
import * as categoryActions from './actions/index';

const store = configureStore();
//store.dispatch(categoryActions.fetchCategories());

ReactDOM.render(
	<Provider store={store}>
    	<App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
