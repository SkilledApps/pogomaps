import React from 'react-native';
import storage, {decorators} from 'redux-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '../_reducers/reducers';
import App from './configureRedux';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const {Component} = React;

const reducer = storage.reducer(combineReducers(reducers));
const engine = createEngine('pogomap');
const middleware = storage.createMiddleware(engine);
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer, applyMiddleware(thunk, logger));

export default class App extends Component {
	componentWillMount() {
		const load = storage.createLoader(engine);
		load(store);
	}

	render() {
		return (
			<Provider store={store}>
				<App {..this.props}/>
			</Provider>
		)
	}
}
