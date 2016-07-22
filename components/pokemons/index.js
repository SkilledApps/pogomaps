/* @flow */
import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import {View, Text,
  TouchableOpacity, Dimensions,
  StyleSheet, AlertIOS, TextInput, LayoutAnimation,
  Image} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import pokemons from './db';
const {width, height} = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard')

export const pokemon = pokemons;

export const POKEMON_PROPS = {
	pokemon: PropTypes.string.isRequired,
	created: PropTypes.string,
	username: PropTypes.string
};

export default class PokemonSelector extends Component {
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
    if (!query) {
      return [];
    }
    return pokemons.filter(p => p.name.toLowerCase().startsWith(query.trim().toLowerCase()))
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
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    return (
        <View style={this.props.style}>
	        <Autocomplete
						onFocus={!!this.props.onFocus && this.props.onFocus}
						onBlur={!!this.props.onBlur && this.props.onBlur}
            value={query || this.props.value}
            blurOnSubmit={true}
            placeholder={this.props.placeholder}
            selectionColor={this.props.selectionColor}
            clearButtonMode={'always'}
            placeholderTextColor={'#ddd'}
						containerStyle={this.props.containerStyle}
						inputContainerStyle={this.props.inputContainerStyle}
						style={this.props.inputStyle}
	          data={data.length === 1 && comp(query, data[0].title) ? [] : data}
	          defaultValue={this.props.value || query}
						clearButtonMode={'while-editing'}
	          onChangeText={text => {
							if (_.trim(text).length > 0) {
								LayoutAnimation.easeInEaseOut();
								this.setState({query: text})
								this.props.getpokemonName(text);
							}
	          }}
            onSubmitEditing={() => {
							let {query} = this.state;
							if (query && query.length > 0) {
								this.props.getpokemonName(this.state.query)
							}
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
