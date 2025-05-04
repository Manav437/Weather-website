const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=a91ef4d9d115c78d7c168f091c2b34ae&query=' + encodeURIComponent(address) + '&limit=1'

    request({ url: url, json: true }, (error, response) => {
        debugger
        if (error) {
            callback('Unable to retrieve data form the API', undefined)
        } else if (response.body.data.length === 0) {
            callback('Unable to search the given location. Please enter a different query', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                city: response.body.data[0].name,
                state: response.body.data[0].region,
                country: response.body.data[0].country
            })
        }
    })
}


module.exports = geocode