import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Share from 'react-native-share';

export default class ShareView extends Component {
  constructor() {
    super();
  }

  onShare() {
    let text = 'See where I caught the latest Pokemon! Download PokeMaps from the app store, team ' + this.props.state.user.teamname;
    Share.open({
      share_text: text,
      share_URL: "https://itunes.apple.com/us/app/pokemap-for-pokemon-go/id1133062782?ls=1&mt=8",
      title: "Tell friends about your pokemons"
    },(e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onShare()} style={this.props.style}>
        <Text style={[styles.text, this.props.textStyle]}>Share Map</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    color: '#fff',
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: 'rgba(0,0,0,0.3)'
  }
})
