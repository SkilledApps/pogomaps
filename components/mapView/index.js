var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  PropTypes,
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
import AutoComplete from '../pockemons';
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
    navigator.geolocation.getCurrentPosition((position) => this.props.actions.setCurrentRegion(position),
      (error) => alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000}
    );
    this.props.actions.getPointsByTeamId('anonymous') // TODO: real name
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.state.isActiveField !== nextState.isActiveField) {
      LayoutAnimation.linear();
    }
  },

  onMapPress(e) {
    this.setState({
      modalVisible: true,
      newPoint: e.nativeEvent.coordinate,
    });
  },

  render() {
    let aligment = this.state.isActiveField ? 'flex-start' : 'center';
    return (
      <TouchableWithoutFeedback style={{flex: 1, width, height, paddingVertical: 20}}>
        <View style={styles.container}>
          <Modal
             animationType={"slide"}
             transparent={true}
             visible={this.state.modalVisible}
             >
            <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: aligment}}>
             <View style={styles.boxWrapper}>
               <Text style={styles.someText}>What's the Pokemon here (choose from selectbox)?</Text>
               <AutoComplete
                  onFocus={() => this.setState({isActiveField: true})}
                  onBlur={() => this.setState({isActiveField: false})}
                  getPockemonName={(name) => this.setState({pockemonName: name})}/>
             </View>
             <TouchableHighlight
             style={styles.button}
              onPress={() => {
               this.props.actions.addNewPoint(this.state.newPoint, this.state.pockemonName)
               this.setState({modalVisible: false})
              }
            }>
               <Text style={styles.buttonText}>Save!</Text>
             </TouchableHighlight>
            </View>
           </Modal>
          <MapView
            style={styles.map}
            initialRegion={this.props.state.region}
            onLongPress={this.onMapPress}
          >
            {this.props.state.markers.map((marker, i) => (
              <MapView.Marker
                key={i}
                image={require('./img/pokeball.png')}
                coordinate={marker.coordinate}
                pinColor={marker.color || 'red'}
                style={{width: 30, height: 30}}
              >
              <MapView.Callout>
                <View>
                  <Text>{marker.pockemon}</Text>
                </View>
              </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>

        </View>
      </TouchableWithoutFeedback>
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
    fontFamily: 'Helvetica-Light',
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
  }

});

module.exports = DefaultMarkers;
