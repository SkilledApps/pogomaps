/* @flow */
import React from 'react';
import * as API from '../_constants/apiEndPoints';
import * as types from './types';
import httpClient from '../_constants/httpClient'

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
  return dispatch => {
    dispatch({type: 'LOAD_POINTS'})
    return fetch(API.getPointsByTeamId(teamName), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => dispatch({type: 'POINTS_LOADED', points: res}))
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error: 'Network error, please try again'}))
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
