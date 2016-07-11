import React from 'react';
import * as API from '../_constants/apiEndPoints';
import * as types from './types';
module.exports = {authSuccess, authStart, authPending, mapGetPointsByTeamId};

function authStart(login, teamName) {
  return (dispatch) => {
    return {
      type: types.AUTH_START
    }
  }
}

function authPending() {
  return (dispatch) => {
    return {
      type: types.AUTH_PENDING
    }
  }
}


function authSuccess() {
  return (dispatch) => {
    return {
      type: types.AUTH_SUCCESS
    }
  }
}

function mapGetPointsByTeamId(teamId) {
  return (dispatch) => {
    return Promise((resolve, reject) => {
      reqMapByTeamId(teamId).then(res => {
        if (!!res) {
          dispatch({
            type: types.MAP_GET_POINTS,
            payload: res
          });
          resolve();
        } else {
          dispatch({
            type: types.ERROR,
            payload: res
          });
          reject();
        }
      }).done();
    });
  }
}

function getMapByUserAndMapName(options) {
  if (!options.userName || !options.mapName) {
    console.error('Request failed, coz request params is not valid', JSON.stringify(options));
    return;
  }

  return Promise((resolve, reject) => {
    fetch(API.get, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  })
}

function reqMapByTeamId(teamId) {
  return Promise((resolve, reject) => {
    fetch(API.getPointsByTeamId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: teamId
      })
    })
    .then(response => response.json())
    .then(resJson => resolve(resJson))
    .catch(error => {
      console.error('reqMapById failed', error.message);
      reject(error);
    }).done();
  });
}
