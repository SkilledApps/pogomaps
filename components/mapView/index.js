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
} = ReactNative;

var MapView = require('react-native-maps');

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

  onMapPress(e) {
    this.setState({
      modalVisible: true,
      newPoint: e.nativeEvent.coordinate,
    })
  },

  render() {
    return (
      <TouchableWithoutFeedback style={{flex: 1, width, height}}>
        <View style={styles.container}>
          <Modal
             animationType={"slide"}
             transparent={true}
             visible={this.state.modalVisible}
             >
            <View style={{flex: 1, alignItems: 'center', 'justifyContent': 'center'}}>
             <View style={{ backgroundColor: 'white', padding: 50, }}>
               <Text>What's the Pokemon here (choose from selectbox)?</Text>

               <TouchableHighlight onPress={() => {
                 this.props.actions.addNewPoint(this.state.newPoint, 'pikachu')
                 this.setState({modalVisible: false})
               }}>
                 <Text style={{ fontSize: 20, color: 'blue' }}>Save!</Text>
               </TouchableHighlight>

             </View>
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
                coordinate={marker.coordinate}
                pinColor={marker.color || 'red'}
              />
            ))}
          </MapView>

        </View>
      </TouchableWithoutFeedback>
    );
  },
});

var styles = StyleSheet.create({
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
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = DefaultMarkers;
