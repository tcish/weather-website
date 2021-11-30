const request = require("request")

const geocode = (address, callback) => {
  const url = `https://geocode.xyz/${encodeURIComponent(address)}?geoit=json`

  request({url: url, json: true}, (err, { body }) => {
    if (err) {
      callback("Unable to connect to geocode service!" ,undefined)
    } else if (body.error) {
      callback("Unable to find location!", undefined)
    } else {
      callback(undefined, {
        latitude: body.latt,
        longitude: body.longt,
        location: body.standard.city +" "+ body.standard.countryname
      })
    }
  })
}

module.exports = geocode