import React, {Component, PropTypes} from 'react';
import {Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Notify extends Component {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  };

  /*
   * @description Error notify as default view
  */
  defaultProps = {
    bgColor: '#EE4027',
    textColor: '#fff',
    message: 'Network error, please try again'
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.bgColor}, this.props.style]}>
        <Text style={[styles.text, {color: this.props.textColor}]}>{this.props.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 16
  }
})
