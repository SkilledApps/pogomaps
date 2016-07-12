/* @flow */
import React from 'react';
import * as API from '../_constants/apiEndPoints';
import * as types from './types';

//
// function authStart(login, teamName) {
//   return (dispatch) => {
//     return {
//       type: types.AUTH_START
//     }
//   }
// }
//
// function authPending() {
//   return (dispatch) => {
//     return {
//       type: types.AUTH_PENDING
//     }
//   }
// }
//
//
// function authSuccess() {
//   return (dispatch) => {
//     return {
//       type: types.AUTH_SUCCESS
//     }
//   }
// }
export function toggleMenu() {
  return dispatch => dispatch({type: types.TOGGLE_MENU});
}

export function singin(team, username) {
  return dispatch =>
    dispatch({type: 'ADD_TEAM'})
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
    .then(res => res.json())
    .then(res => getPointsByTeamId(teamName)(dispatch))
    .then(res => dispatch({type: 'TEAM_ADDED'}))
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error}))
}

export function getPointsByTeamId(teamName) {
  return dispatch =>
    dispatch({type: 'LOAD_POINTS'})
    fetch(API.getPointsByTeamId(teamName), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => dispatch({type: 'POINTS_LOADED', points: res}))
    .catch(error =>  dispatch({type: 'NETWORK_ERROR', error}))
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
        username: getState().username || 'anonymous',
        pokemon,
      })
    })
      .then(res => res.json())
      .then(res => dispatch({type: 'POINT_ADDED', res}))
      .catch(error =>  dispatch({type: 'NETWORK_ERROR', error}))
  }
}

export function setCurrentRegion(position) {
  return { type: 'SET_REGION', position }
}
