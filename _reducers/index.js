import * as actions from '../_actions/actions';
import {LOAD, SAVE} from 'redux-storage';
import * as types from '../_actions/types'

const initialState = {
  isLogget: false,
  isPending: false,
  isLoading: false,
  isMenuOpened: false,
  user: {
    teamname: 'anonymous',
    username: 'anonymous',
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
        ...state,
        region: state.region,
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
          ...state,
          isLoading: false
        }
      }

      return {
        ...state,
        markers: state.markers.concat({
          coordinate: action.coordinates,
          pokemon: action.pokemon,
          username: state.user.username || 'anonymous',
          createdAt: new Date(),
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
      if (action.payload && action.payload.points.length > 0) {
        return {
          ...state,
          isLoading: false,
          markers: action.payload.points.map(item => {
            return {
              coordinate: item.point,
              pokemon: item.pokemon,
              username: item.username,
              createdAt: item.created_at,
            }
          })
        }
      }
      return state;

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
    case 'ADD_TEAM_START' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'ADD_TEAM': {
      nextState = {
        ...state,
        isLoading: true,
        user: {
          teamName: action.team,
          username: action.username,
        }
      }
    }
    case 'LOAD_POINTS':
      return {
        ...state,
        isLoading: true,
      }
    case 'ERROR_RESET' : {
      nextState = {
        ...state,
        isError: false
      }
      return nextState;
    }

    case 'NETWORK_ERROR': {
      return {
        ...state,
        isError: true,
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
