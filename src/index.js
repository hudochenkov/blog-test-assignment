import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers';
import './index.css';
import App from './components/App';

// Use Redux DevTools in development mode
const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
