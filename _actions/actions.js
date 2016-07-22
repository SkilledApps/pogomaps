/* @flow */
import React from 'react';
import * as API from '../_constants/apiEndPoints';
import * as types from './types';
import httpClient from '../_constants/httpClient'
import Share from 'react-native-share';

export function share(name: String) {
	return (dispatch) => {
	    let text = 'See where I caught the latest Pokemon! Download PokeMaps from the app store, team ' + name;
	    Share.open({
	      share_text: text,
	      share_URL: "https://itunes.apple.com/us/app/pokemap-for-pokemon-go/id1133062782?ls=1&mt=8",
	      title: "Tell friends about your pokemons"
	    },(e) => {
	      console.log(e);
	    });
		dispatch({type: 'SHARE'});
	}
}

export function vote(data) {
	return (dispatch) => {
		dispatch({'VOTE_POKEMON', paylaod: data});
	}
}

export function toggleMenu() {
  return dispatch => dispatch({type: types.TOGGLE_MENU});
}

export function resetErrorState() {
  return dispatch => dispatch({type: 'ERROR_RESET'});
}

export function signin(team, username) {
  return dispatch => {
    dispatch({type: 'ADD_TEAM_START'});
    fetch(API.addUserToTeam, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team,
        username
      })
    })
    .then(res => { dispatch({type: 'ADD_TEAM', team, username });
    if (res.status === 200) {
      getPointsByTeamId(team)(dispatch)
      dispatch({type: 'TEAM_ADDED'})
    } else {
      console.error(res)
      dispatch({type: 'NETWORK_ERROR', error: 'This user already exists'})
    } })
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error: 'Network error, please try again'}))
  }
}

export function getPointsByTeamId(teamName) {
  return (dispatch, getState) => {
    dispatch({type: 'LOAD_POINTS'})
    return fetch(API.getPointsByTeamId(teamName, getState().reducer.box), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => dispatch({type: 'POINTS_LOADED', points: res}))
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error: 'Network error, please try again', e: error}))
  }
}

export function addNewPoint(coordinates, pokemon) {
  return (dispatch, getState) => {
    // оптимистичная транзакция (после этого можно закрыть модальное окно)
    // маркер появляется на карте
    // но лоадер пусть крутится
    dispatch({type: 'NEW_POINT', coordinates, pokemon})
    return fetch(API.addNewPoint, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates,
        username: getState().reducer.user && getState().reducer.user.username || 'anonymous',
        pokemon,
      })
    })
      .then(res => res.json())
      .then(res => dispatch({type: 'POINT_ADDED', res}))
      .catch(error =>  dispatch({type: 'NETWORK_ERROR', error: 'Network error, please try again'}))
  }
}

export function setCurrentRegion(position) {
  return { type: 'SET_REGION', position }
}

export function setCurrentBox(box: string) {
  return { type: 'SET_BOX', payload: { box } }
}

export function setFilter(filter: string) {
  return { type: 'SET_FILTER', payload: { filter } }
}

export function getStats() {
  return dispatch => {
    return fetch(API.getStats, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => dispatch({type: 'STATS_LOADED', stats: res}))
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error: 'Network error, please try again'}))
  }
}
