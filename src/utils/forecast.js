const request = require("request")


const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=5&appid=4adc74b5400545a7a25079e09c463f27&units=metric`

  request({url, json: true}, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service!" ,undefined)
    } else if (body.cod === 400) {
      callback("Unable to find weather!", undefined)
    } else {
      callback(undefined, `It is currently ${body.list[0].main.temp} degrees out. There is a ${body.list[0].rain ? body.list[0].rain : "0%"} chance of rain.`)
    }
  })
}

module.exports = forecast