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
        <Text></Text>
        <TouchableOpacity onPress={() => this.handleLeftButton()}>
          <Icon style={styles.textShadow} name='menu' size={35} color="#fff"/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 20,
    paddingHorizontal: 20,
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
    textShadowRadius: 5
  }
})
