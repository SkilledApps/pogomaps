import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class Loader extends Component {
  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <ActivityIndicator
          animating={true}
          color='#fff'
          size='large'
          style={{height: 80}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width, height,
    alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'rgba(0,0,0,0.8)'
  }
});
