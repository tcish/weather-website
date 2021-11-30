const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 47000

// handlebars engine
app.set("view engine", "hbs")

// static directory
const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))

// handlebars view location
const viewsPath = path.join(__dirname, "../templates/views")
app.set("views", viewsPath)

// handlebars partials location
const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)


app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "SHS"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "SHS"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "SHS"
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide an address!")
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "SHS",
    errorMessage: "Help article not found!"
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "SHS",
    errorMessage: "Page not found"
  })
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})