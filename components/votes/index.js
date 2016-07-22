import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {POKEMON_PROPS} from '../pokemons';

const THUMBS_UP = Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up';
const THUMBS_DOWN = Platform.OS === 'ios' ? 'ios-thumbs-down' : 'md-thumbs-down';

export default class Vote extends Component {
	static propTypes = {
		...POKEMON_PROPS,
		width: PropTypes.number,
		height: PropTypes.number,
		onVote: PropTypes.func
	};

	handlerOnVote(vote) {
		this.props.onVote(vote);
	}

	render() {
		let {pokemon, created, username, image} = this.props;
		console.log(pokemon, image)
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={[styles.sideArea, styles.leftArea]}>
					<TouchableOpacity onPress={() => this.handlerOnVote(true)}>
						<Icon name={THUMBS_UP} color='#3FD158' size={35} />
					</TouchableOpacity>
				</View>
				<View style={styles.centerArea}>
					<Image soure={image} resizeMode='contain' style={styles.image}/>
					<Text style={styles.centerText}>{pokemon}</Text>
				</View>
				<View style={[styles.sideArea, styles.rightArea]}>
					<TouchableOpacity onPress={() => this.handlerOnVote(false)}>
						<Icon name={THUMBS_DOWN} color='#D91506' size={35} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		position: 'absolute',
		bottom: 0,
		left: 0, right: 0,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	centerArea: {
		alignSelf: 'flex-start',
		justifyContent: 'center',
		width: 90,
		height: 90,
		borderRadius: 45,
		top: - 45,
		backgroundColor: '#fff'
	},
	centerText: {
		textAlign: 'center',
		fontFamily: 'Helvetica-Bold',
		fontSize: 14
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 45,
		marginBottom: 10
	},
	sideArea: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderColor: 'rgba(128,128,128, .2)',
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
