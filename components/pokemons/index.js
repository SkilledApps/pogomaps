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

 // onTyping(text){
 //      let pokemons = names.filter(function (pokemon) {
 //          return pokemon.toLowerCase().startsWith(text.toLowerCase())
 //      }).map(function (pokemon) {
 //          return pokemon;
 //      });
 //
 //      this.setState({data: pokemons});
 //  }
  _filterData(query: string) {
    return pokemons.filter(p => p.name.toLowerCase().startsWith(query.toLowerCase()))
  }

  render() {
    const { query } = this.state;
    const data = this._filterData(query)
    return (
        <View style={styles.container}>

        <Autocomplete
          data={data}
          defaultValue={query}
          onChangeText={text => {
            LayoutAnimation.easeInEaseOut();
            this.setState({query: text})
          }}
          renderItem={pokemon => (
            <TouchableOpacity onPress={() => {
              this.setState({query: pokemon.name})
              LayoutAnimation.spring();
              dismissKeyboard();
              this.props.getpokemonName(pokemon.name);
            }} style={styles.row}>
              <Image source={{ uri: pokemon.src }} style={{height: 30, width: 30}}/>
              <Text style={{fontSize: 20, fontWeight: '200', marginLeft: 10}}>{pokemon.name}</Text>
            </TouchableOpacity>
          )}
        />
          {/*<AutoCompletePlugin
            onTyping={(text) => this.onTyping(text)}
            onSelect={(e) => this.props.getpokemonName(e)}
            onFocus={() => this.props.onFocus()}
            onBlur={() => this.props.onBlur()}
            suggestions={this.state.data}
            placeholder='Type Monster Name'
            style={styles.autocomplete}
            clearButtonMode='always'
            returnKeyType='go'
            textAlign='center'
            clearTextOnFocus={true}

            maximumNumberOfAutoCompleteRows={10}
            applyBoldEffectToAutoCompleteSuggestions={true}
            reverseAutoCompleteSuggestionsBoldEffect={true}
            showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
            autoCompleteTableViewHidden={false}

            autoCompleteTableBorderColor='lightblue'
            autoCompleteTableBackgroundColor='azure'
            autoCompleteTableCornerRadius={10}
            autoCompleteTableBorderWidth={1}

            autoCompleteRowHeight={35}

            autoCompleteFontSize={15}
            autoCompleteRegularFontName='Helvetica Neue'
            autoCompleteBoldFontName='Helvetica Bold'
            autoCompleteTableCellTextColor={'red'}
          />*/}
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
      justifyContent: 'center',
      marginVertical: 10,
    }
});
