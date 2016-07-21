/* @flow */
import React, {Component} from 'react';
import {View, Text,
  TouchableOpacity, Dimensions,
  StyleSheet, AlertIOS, TextInput, LayoutAnimation,
  Image} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import pokemons from './db';
const {width, height} = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard')

export const pokemon = pokemons;

export default class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
        query: '',
        pokemons
    };
  }

  state: {
    query: string;
    pokemons: Array<any>;
  };

  _filterData(query: string) {
    return pokemons.filter(p => p.name.toLowerCase().startsWith(query.toLowerCase()))
  }

	renderPokemonListRow(pokemon) {
		let {src, name} = pokemon;
		let blankImg = require('./img/pokeball.png');
		let image = src ? { uri: src } : blankImg;
		return (
			<TouchableOpacity onPress={() => {
				this.setState({query: name})
				LayoutAnimation.easeInEaseOut();
				dismissKeyboard();
				this.props.getpokemonName(name);
			}} style={this.props.rowStyle ? this.props.rowStyle : styles.row}>
				<Image resizeMode='contain' source={image} style={{height: 30, width: 30}} onError={() => console.log('error')}/>
				<Text style={{fontSize: 16, fontWeight: '200', marginLeft: 10}}>{name}</Text>
			</TouchableOpacity>
		)
	}

  render() {
    const { query } = this.state;
    const data = this._filterData(query)
    return (
        <View style={this.props.style}>
	        <Autocomplete
            placeholder={this.props.placeholder}
            selectionColor={this.props.selectionColor}
            clearButtonMode={'always'}
            placeholderTextColor={'#ddd'}
						containerStyle={this.props.containerStyle}
						inputContainerStyle={this.props.inputContainerStyle}
						style={this.props.inputStyle}
	          data={data}
	          defaultValue={query}
	          onChangeText={text => {
	            LayoutAnimation.easeInEaseOut();
	            this.setState({query: text})
	          }}
	          renderItem={(pokemon) => this.renderPokemonListRow(pokemon)}
	        />
        </View>
    );

  }
}


var styles = StyleSheet.create({
    autocomplete: {
        alignSelf: 'stretch',
        height: 50,
        backgroundColor: '#FFF',
        borderColor: '#EE4027',
        borderWidth: 1,
        borderRadius: 10
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      overflow: 'hidden',
    }
});
