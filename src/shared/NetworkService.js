const baseUrl = 'http://api.openweathermap.org/data/2.5/';
const apiKey = '799acd13e10b7a3b7cf9c0a8da6e5394';

export const getWeatherOfCity = async city => {
  return fetch(`${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      this.handleError(error);
    });
};

export const getForecast = async (latitude, longitude) => {
  return fetch(
    `${baseUrl}onecall?&units=metric&exclude=minutely&appid=${apiKey}&lat=${latitude}&lon=${longitude}`,
  )
    .then(response => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      this.handleError(error);
    });
};

handleResponseError = response => {
  throw new Error('HTTP error, status = ' + response.status);
};
handleError = error => {
  console.log(error.message);
};
