import * as actions from '../_actions/actions';
import {LOAD, SAVE} from 'redux-storage';
import * as types from '../_actions/types'

const initialState = {
  isPending: false,
  isLoading: true,
  isWaitingStorage: true,
  isMenuOpened: false,
  user: {
    teamname: 'anonymous',
    username: 'anonymous',
  },
  markers: [],
};

let nextState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      nextState = {
        ...state,
        isWaitingStorage: false,
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
      if (action.points && action.points.length > 0) {
        return {
          ...state,
          isLoading: false,
          markers: action.points.map(item => {
            return {
              coordinate: updateCoordinates(item.point),
              pokemon: item.pokemon,
              username: item.username,
              createdAt: item.created_at,
            }
          })
        }
      }
      return {
        ...state,
        isLoading: false,
        markers: [],
      };

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
      };

      return nextState;
    }
    case 'ADD_TEAM': {
      return {
        ...state,
        isLoading: true,
        markers: [],
        user: {
          teamname: action.team,
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
        error: action.error || 'Network error, please try again',
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

function updateCoordinates(coord) {
  return {
    latitude: coord.y,
    longitude: coord.x,
  }
}
