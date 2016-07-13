/* @flow */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const {width, height} = Dimensions.get('window');

export default class Menu extends Component {
  constructor(props) {
    super();
    this.state = {
      teamname: props.state.user.teamname === 'anonymous' ? '' : props.state.user.teamname,
      username: props.state.user.username === 'anonymous' ? '' : props.state.user.username,
    }
  }

  state: {
    teamname: string;
    username: string;
  };

  handleEnter() {
    if (this.state.teamname.length > 0 && this.state.username.length > 0) {
      this.props.actions.signin(this.state.teamname, this.state.username);

    } else {
      alert('Fill the fields or close the dialog');
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.menuItem}>
          <Icon name='people' size={35} color='#333'/>
          <TextInput
            placeholder='Team name'
            keyboardType='name-phone-pad'
            maxLength={20}
            value={this.state.teamname}
            onChangeText={(text) => this.setState({teamname: text})}
            style={styles.input}></TextInput>
        </View>
        <View style={styles.menuItem}>
          <Icon name='perm-identity' size={35} color='#333'/>
          <TextInput
            placeholder='Your name'
            keyboardType='name-phone-pad'
            maxLength={20}
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text})}
            style={styles.input}
            ></TextInput>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => this.handleEnter()} style={styles.button}>
            <Text style={styles.buttonText}>{this.props.state.user.teamname === 'anonymous' ? 'JOIN' : 'JOIN'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 10,
    paddingHorizontal: 15,
    // position: 'absolute',
    // top: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    padding: 5,
    marginLeft: 15
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE4027',
    width: width * 0.8,
    left: -15,
    bottom: -10,
    padding: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Helvetica-Light',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})
