import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, AlertIOS, TextInput} from 'react-native';
import AutoCompletePlugin from 'react-native-autocomplete';
import names from './list';
const {width, height} = Dimensions.get('window');

export default class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
        data: names
    };
  }

 onTyping(text){
      let pockemons = names.filter(function (pockemon) {
          return pockemon.toLowerCase().startsWith(text.toLowerCase())
      }).map(function (pockemon) {
          return pockemon;
      });

      this.setState({data: pockemons});
      console.log('pockemons', pockemons);
  }


  render() {
    return (
        <View style={styles.container}>
          <AutoCompletePlugin
            onTyping={(text) => this.onTyping(text)}
            onSelect={(e) => this.props.getPockemonName(e)}
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50,

    }
});
