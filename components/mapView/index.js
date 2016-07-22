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
import PokemonSelector from '../pokemons';
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

	handleOnPressMarker(marker, index) {
		console.log(marker);
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
    const markers = this.props.state.filter ? this.props.state.markers
      .filter(m => m.pokemon && m.pokemon.toLowerCase().startsWith(this.props.state.filter.toLowerCase())) :
      this.props.state.markers;

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
                 <Text style={styles.someText}>New Monster!</Text>
                 <PokemonSelector
								 		placeholder={'Enter Pokemon'}
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
            {markers.map((marker, i) => {
              return (
                <MapView.Marker
									onPress={() => this.handleOnPressMarker(marker, i)}
                  key={marker.createdAt}
                  coordinate={marker.coordinate}
                >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={getImageSrcFor(marker.pokemon) || require('./img/pokeball.png')}
                    style={styles.pokemon} resizeMode={'contain'} />
                  <Text style={{fontSize: 14}}>{marker.pokemon}</Text>
                  <Text style={{fontSize: 10, width: 100, textAlign: 'center', color: '#777', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} numberOfLines={2}>
                    {`${moment(marker.createdAt).fromNow()}`}
										{marker.username === 'anonymous' ?  '' : 'by ' + marker.username}
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
								 	resizeMode='contain'
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

  pokemon: { width: 47, height: 47, borderRadius: 25, borderWidth: 3, borderColor: '#fff', backgroundColor: 'transparent'},

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
