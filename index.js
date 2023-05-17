const { fetchCoordsByIP } = require('./iss');

const ip = '42'; 
fetchCoordsByIP(ip, (error, data) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log('Latitude:', data.latitude);
    console.log('Longitude:', data.longitude);
  }
});