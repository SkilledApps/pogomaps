export const apiEndPoints = () => {
  /*
    @description Get all map points for joined team
  */
  const getPointsByTeamId = (teamId) => {
    return `http://api.hashley.com/points/${teamId}`;
  };

  /*
    @description Put new point in joined team
  */
  const postNewPoint = (teamId, lat, lng) => {
    return `http://api.hashley.com/points/${teamId, lat, lng}`;
  }
}
