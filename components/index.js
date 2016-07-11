import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MapView from './mapView';
import Header from './header';
import Menu from './menu';
import AutoComplete from './pockemons';

const {width, height} = Dimensions.get('window');

export default class Pogomaps extends Component {
  constructor() {
    super();
  }
  defaltProps = {
    isMenuOpened: false
  };
  componentWillMount() {
    if (this.props.state.isMenuOpened === true) {
      this.props.actions.toggleMenu();
    }
  }

  componentWillUnmount() {
    if (this.props.state.isMenuOpened === true) {
      this.props.actions.toggleMenu();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView {...this.props} style={{flex: 1}} autoComplete={AutoComplete} />
        {!this.props.state.username && this.props.state.isMenuOpened &&<View style={styles.cover}></View>}
        {!this.props.state.username && this.props.state.isMenuOpened && <Menu {...this.props}/>}
        <Header {...this.props} style={styles.header}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    width, height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
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
  }
});
