import * as actions from '../_actions/actions';
import {LOAD, SAVE} from 'redux-storage';
import * as types from '../_actions/types'

const initialState = {
  isLogget: false,
  isPending: false,
  isLoading: false,
  user: {
    teamName: '',
    teamId: '',
    userName: '',
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

    default: {
      nextState = {...state};
      return nextState;
    }

  }
}
