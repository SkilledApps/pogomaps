import React, {Component} from 'react';
import storage, {decorators} from 'redux-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '../_reducers';
import App from './configureRedux';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

const reducer = storage.reducer(combineReducers(reducers));
const engine = createEngine('POGOMAP_V010');
const middleware = storage.createMiddleware(engine);
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer, applyMiddleware(thunk, logger));

export default class Pogomaps extends Component {
	componentWillMount() {
		const load = storage.createLoader(engine);
		load(store);
	}

	render() {
		return (
			<Provider store={store}>
				<App/>
			</Provider>
		)
	}
}
