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


module.exports = { fetchISSFlyOverTimes,fetchCoordsByIP, nextISSTimesForMyLocation};


