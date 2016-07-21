import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AppState,
  StatusBar,
} from 'react-native';
import MapView from './mapView';
import Header from './header';
import Menu from './menu';
import AutoComplete from './pokemons';
import Loader from './loader';
import Notify from './notification';
const {width, height} = Dimensions.get('window');

export default class Pogomaps extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.state.isMenuOpened === true) {
      this.props.actions.toggleMenu();
    }
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.state.isWaitingStorage && !nextProps.state.isWaitingStorage) {
      this._handleAppStateChange()
    }
  }

  _handleAppStateChange(currentAppState) {
    let team = this.props.state.user.teamname ? this.props.state.user.teamname : 'anonymous';
    this.props.actions.getPointsByTeamId(team) // TODO: real name
    this.props.actions.getStats();
  }

  componentWillUnmount() {
    if (this.props.state.isMenuOpened === true) {
      this.props.actions.toggleMenu();
    }
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.state.isError === true && nextProps.state.isError !== this.props.state.isError) {
      this.resetTimeout = setTimeout(() => {
        this.props.actions.resetErrorState();
        clearTimeout(this.resetTimeout);
      }, 2000)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <MapView {...this.props} style={{flex: 1}} autoComplete={AutoComplete}></MapView>
        {!this.props.state.username && this.props.state.isMenuOpened &&
            <TouchableOpacity style={styles.cover} onPress={() => this.props.actions.toggleMenu()} activeOpacity={0.8}>
              <Menu {...this.props}/>
            </TouchableOpacity>}
        <Header
					{...this.props}
					onLeftButtonPress={() => this.props.actions.toggleMenu()}
					onRightButtonPress={() => this.props.actions.share(this.props.state.user.username)}
					onSearch={() => console.log('onSearch')}
				/>
        {
            this.props.state.isLoading && <Loader style={styles.loader}/>
        }
        {this.props.state.isError &&
          <Notify
            bgColor='#EE4027'
            textColor='#fff'
            message={this.props.state.error}
            style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    width, height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 80
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  loader: {
    position: 'absolute',
    width, height,
    top: 0, left: 0, right: 0, bottom: 0
  }
});
