import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, LayoutAnimation} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Header extends Component {
  constructor() {
    super();
  }

  handleLeftButton() {
    LayoutAnimation.easeInEaseOut();
    this.props.actions.toggleMenu();
  }

  render() {
    return(
      <View style={[styles.container, this.props.styles]}>
        <View style={styles.textWrap}>
          <Text style={styles.teamName}>Team:{this.props.state.user.teamname}</Text>
          </View>
        <TouchableOpacity style={styles.button} onPress={() => this.handleLeftButton()}>
          <Icon name='menu' size={35} color="#333"/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrap: {
    marginTop: 15,
    marginLeft: 10,
  },
  teamName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    color: '#EE4027',
    // textShadowOffset: {width: 0, height: 1},
    // textShadowColor: 'rgba(0,0,0,0.3)'
  }
})
