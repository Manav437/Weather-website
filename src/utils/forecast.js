const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=d38c9592399f69432d13e8641ecb7bbc&query=' + lat + ',' + long + '&units=f'
    ///below is an object
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('not able to fetch data from API', undefined)
        } else if (response.body.error) {
            callback('please enter correct coordinates', undefined)
        } else {
            const weatherDesc = response.body.current.weather_descriptions[0]
            const currentTemp = response.body.current.temperature
            const feelsLikeTemp = response.body.current.feelslike
            callback(undefined, weatherDesc + " - It is currently " + currentTemp + " degrees out. It feels like " + feelsLikeTemp + " degrees out.")
        }
    })
}

module.exports = forecast