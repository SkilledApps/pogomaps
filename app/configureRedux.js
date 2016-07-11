import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import App from '../components';
import * as actionsCreators from '../_actions/actions';
import {connect} from 'react-redux';

class ReduxApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {state, actions} = this.props;
		return (
			<App
				state={state}
				actions={actions}
			/>
		)
	}
}

export default connect(state => ({
		state: state.reducer
	}),
	(dispatch) => ({
		actions: bindActionCreators(actionsCreators, dispatch)
	})
)(App);
