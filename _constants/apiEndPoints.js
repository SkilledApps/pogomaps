/* @flow */
//const BASE_HOST = 'http://localhost:4000/pokemon'
const BASE_HOST = 'http://api.tagforcause.com/pokemon'
/*
  @description Get all map points for joined team
*/
export const getPointsByTeamId = (teamId, box) => {
  if (box) {
    return `${BASE_HOST}/points/?teamName=${teamId}&box=${encodeURIComponent(box)}`;
  } else {
    return `${BASE_HOST}/points/?teamName=${teamId}`
  }

};

export const addUserToTeam = `${BASE_HOST}/teams/`;
/*
  @description Put new point in joined team
*/
export const addNewPoint = `${BASE_HOST}/points/`;
/*
  @description Put new user in team
*/
export const addNewTeam = `${BASE_HOST}/team/`;

/*
  @description Get stats for last hour
*/
export const getStats = `${BASE_HOST}/stats/`;
