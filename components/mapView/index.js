/* @flow */
var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment')
var pokemons = require('../pokemons/db.json')
var {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  LayoutAnimation
} = ReactNative;

var MapView = require('react-native-maps');
import AutoComplete from '../pokemons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Share from '../share';
var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var DefaultMarkers = React.createClass({
  getInitialState() {
    return {
      modalVisible: false
    };
  },

  componentWillMount() {
  },

  onMapPress(e) {
    this.setState({
      modalVisible: true,
      newPoint: e.nativeEvent.coordinate,
    });
  },

  onRegionChange(region) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const box = `((${region.longitude - region.longitudeDelta/2}, ${region.latitude - region.latitudeDelta / 2}), (${region.longitude + region.longitudeDelta/2}, ${region.latitude + region.latitudeDelta / 2}))`;
      this.props.actions.setCurrentBox(box)
      let team = this.props.state.user.teamname ? this.props.state.user.teamname : 'anonymous';
      this.props.actions.getPointsByTeamId(team)
    }, 250);
  },

  render() {
    return (
      <View style={{flex: 1, width, height, paddingVertical: 20}}>
        <View style={styles.container}>
          <Modal
             animationType={"fade"}
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() => this.setState({modalVisible: false, newPoint: null})}
             >
              <View style={styles.modalInner}>
                <TouchableOpacity
                  style={{position: 'absolute', top: 0, left: 0, }}
                  onPress={() => this.setState({modalVisible: false, newPoint: null})}>
                  <View style={{position: 'absolute', top: 0, width: width, height: height, flex: 1}} />
                </TouchableOpacity>
               <View style={styles.boxWrapper}>
                 <Text style={styles.someText}>Add location</Text>
                 <AutoComplete
                    onFocus={() => this.setState({isActiveField: true})}
                    onBlur={() => this.setState({isActiveField: false})}
                    getpokemonName={(name) => {
                      this.setState({pokemonName: name});
                      this.setState({newPointSrc: getImageSrcFor(name)});
                    }}/>
               </View>

               <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  LayoutAnimation.spring();
                  this.props.actions.addNewPoint(this.state.newPoint, this.state.pokemonName);
                  this.setState({modalVisible: false, newPoint: null, newPointSrc: null});
                }}>
                 <Text style={styles.buttonText}>Save!</Text>
               </TouchableHighlight>
              </View>

           </Modal>
          <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            onLongPress={this.onMapPress}
            onRegionChange={(region) => this.onRegionChange(region)}
          >
            {this.props.state.markers.map((marker, i) => {
              return (
                <MapView.Marker
                  key={i}
                  coordinate={marker.coordinate}
                >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={getImageSrcFor(marker.pokemon) || require('./img/pokeball.png')}
                    style={styles.pokemon} resizeMode={'contain'} />
                  <Text style={{fontSize: 12}}>{marker.pokemon}</Text>
                  <Text style={{fontSize: 8, color: '#777', backgroundColor: 'white'}}>
                    {`${moment(marker.createdAt).fromNow()} by ${marker.username}`}
                  </Text>
                </View>
                </MapView.Marker>
              );
            })}
            {this.state.newPoint &&
              <MapView.Marker
                key={1000}
                coordinate={this.state.newPoint}
                pinColor={'gray'}
               >
               <View style={{alignItems: 'center', justifyContent: 'center'}}>
                 <Image
                  source={this.state.newPointSrc ? this.state.newPointSrc : require('./img/graypokeball.png')}
                  style={styles.pokemon}/>
                 <Text style={{fontSize: 12}}>New pokemon</Text>
                 <Text style={{fontSize: 8, color: '#777', backgroundColor: 'white'}}>
                   by {this.props.state.user.username}
                 </Text>
               </View>
             </MapView.Marker>
           }
                <Text style={[styles.screenText]}>Long tap to add a new monster to map</Text>
              </MapView>
          {this.props.state.markers.length > 0 &&
            <Share {...this.props} style={styles.button} textStyle={styles.buttonText} />
          }
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  boxWrapper: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    //marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE4027',
    width: width,
    left: 0,
    padding: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  someText: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
    marginVertical: 10,
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  screenText: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    color: '#333',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    width: width,
  },

  pokemon: { width: 30, height: 30, borderRadius: 2, borderWidth: 0.5, borderColor: 'black', backgroundColor: 'transparent' },

  modalInner: {
    flex: 1, alignItems: 'center', paddingTop: 20, padding: 20, marginTop: 0, justifyContent: 'flex-start'
  }

});

function getImageSrcFor(name) {
  if (!name) {
    return null;
  }
  const found = pokemons.filter(p => p.name === name);
  return found && found.length > 0 ? {
    uri: found[0].src
  } : null;
}

module.exports = DefaultMarkers;
