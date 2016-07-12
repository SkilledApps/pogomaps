import * as actions from '../_actions/actions';
import {LOAD, SAVE} from 'redux-storage';
import * as types from '../_actions/types'

const initialState = {
  isLogget: false,
  isPending: false,
  isLoading: false,
  isMenuOpened: false,
  user: {
    teamName: '',
    teamId: '',
    username: '',
  },
  markers: [],
  defaultPosition: {lat: 37.78825, lng: -122.4324},
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

let nextState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      nextState = {
        ...state
      }
      return nextState;
    }

    case SAVE: {
      nextState = {
        ...state
      }
      return nextState;
    }

    case types.MAP_GET_POINTS: {
      nextState = {
        ...state,
        markers: action.payload
      };
      return nextState;
    }

    case 'NEW_POINT': {
      if (!action.pokemon || action.pokemon.length === 0) {
        return {
          ...state
        }
      }

      return {
        ...state,
        markers: state.markers.concat({
          coordinate: action.coordinates,
          pokemon: action.pokemon
        }),
        isLoading: true,
      };
    }

    case 'POINT_ADDED': {
      return {
        ...state,
        isLoading: false,
      }
    }

    case 'POINTS_LOADED': {
      return {
        ...state,
        isLoading: false,
      }
    }

    case 'SET_POSITION': {
      return {
        ...state,
        region: position.coords
      }
    }

    case 'TEAM_ADDED': {
      nextState = {
        ...state,
        isMenuOpened: false,
        isLoading: false,
        user: {
          ...state.user,
          ...action.payload
        }
      };

      return nextState;
    }

    case 'ADD_TEAM': {
      nextState = {
        ...state,
        ...action.payload
      }
    }
    case 'LOAD_POINTS':
      return {
        ...state,
        isLoading: true,
      }

    case 'NETWORK_ERROR': {
      return {
        ...state,
        isMenuOpened: false,
        isLoading: false,
      }
    }

    case types.TOGGLE_MENU : {
      nextState = {
        ...state,
        isMenuOpened: !state.isMenuOpened
      }
      return nextState;
    }

    default: {
      nextState = {...state};
      return nextState;
    }

  }
}
