const request = require('request');

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipvigilante.com/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      const data = JSON.parse(body);
      if (data.status === 'success') {
        const coords = {
          latitude: data.data.latitude,
          longitude: data.data.longitude
        };
        callback(null, coords);
      } else {
        const errorMessage = `Error: ${data.message}`;
        callback(new Error(errorMessage), null);
      }
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMessage = `Request failed with status code ${response.statusCode}`;
      callback(new Error(errorMessage), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const flyOverTimes = data.response;
      callback(null, flyOverTimes);
    } catch (error) {
      callback(error, null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flyOverTimes);
      });
    });
  });
};


module.exports = { fetchISSFlyOverTimes,fetchCoordsByIP, nextISSTimesForMyLocation};


