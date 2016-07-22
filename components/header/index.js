/**
 * @flow
 */
'use strict';

const React = require('React');
const ReactNative = require('react-native');
const NavigationHeaderTitle = require('NavigationHeaderTitle');
const NavigationHeaderBackButton = require('NavigationHeaderBackButton');
const NavigationPropTypes = require('NavigationPropTypes');
const NavigationHeaderStyleInterpolator = require('NavigationHeaderStyleInterpolator');
const ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const Icon = require('react-native-vector-icons/Ionicons');
const {Component, PropTypes} = React;

import AutoComplete, {pokemon} from '../pokemons';

function getImageSrcFor(name) {
  if (!name) {
    return null;
  }
  const found = pokemon.filter(p => p.name === name);
  return found && found.length > 0 ? {
    uri: found[0].src
  } : null;
}


const {
  Animated,
  Platform,
  StyleSheet,
  View,
	TouchableOpacity,
	TextInput,
	Dimensions
} = ReactNative;
let {width, height} = Dimensions.get('window');

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 46 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 12 : 0;

const ICON_ADD = Platform.OS === 'ios' ?
	{name: 'ios-settings-outline', color: '#fff', size: 26} :
	{name: 'md-settings', color: '#fff', size: 26};

const ICON_SHARE = Platform.OS === 'ios' ?
	{name: 'ios-share-outline', size: 26, color: '#fff'} :
	{name: 'android-share', size: 26, color: '#fff'};

export default class AppHeader extends Component {
	constructor(props) {
		super();
	}

	handlerOnFocus(isActive) {
		let {onSearchFieldFocus} = this.props;
		if (!!onSearchFieldFocus) {
			alert(isActive); // не срабатывает
			onSearchFieldFocus(isActive);
		}
	}

	render() {
		return (
			<View style={styles.appbar}>
				<View style={styles.center}>
					<AutoComplete
              value={this.props.state.filter}
              placeholder={'Filter by Pokemon'}
              selectionColor={'#ddd'}
							containerStyle={styles.searchBar}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.searchControl}
							rowStyle={styles.rowStyle}
							onFocus={() => this.handlerOnFocus(true)}
							onBlur={() => this.handlerOnFocus(false)}
							getpokemonName={(name) => {
							  this.props.actions.setFilter(name);
							}}/>
				</View>
				<View style={styles.left}>
					<TouchableOpacity onPress={this.props.onLeftButtonPress}>
						<Icon {...ICON_ADD}/>
					</TouchableOpacity>
				</View>
				<View style={styles.right}>
					<TouchableOpacity onPress={this.props.onRightButtonPress}>
						<Icon {...ICON_SHARE}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  appbar: {
		flex: 1,
    alignItems: 'center',
    backgroundColor: '#427EBB',
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    elevation: 4,
    flexDirection: 'row',
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
    left: 0,
    marginBottom: 16, // This is needed for elevation shadow
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: STATUSBAR_HEIGHT,
		paddingHorizontal: 10
  },

  center: {
    marginTop: STATUSBAR_HEIGHT/2
  },

  left: {
    marginTop: STATUSBAR_HEIGHT/2,
		padding: 5
  },

  right: {
    marginTop: STATUSBAR_HEIGHT/2,
		padding: 5
  },

	searchBar: {
		// backgroundColor: 'rgba(255,255,255,0.1)',
		// borderRadius: 5,
		// padding: 5,
		flex: 1,
		width: width - 20 - 20 - 25 * 2,
		borderColor: 'transparent',
    justifyContent: 'space-between',
    top: 0,
	},

	searchControl: {
    height: APPBAR_HEIGHT / 2 + 5,
		paddingLeft: 10,
		fontSize: 14,
		color: '#fff',
		textAlign: 'left',
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderWidth: 0,
		zIndex: 10
	},
  inputContainerStyle: {
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'transparent',
    marginBottom: 10,
		borderRadius: 5
  },
	rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      paddingVertical: 10,
			backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      overflow: 'hidden',
	}
});
