const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//path provided in dirname and pathname is not relative therefore path.join is used
// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))


const app = express()


//define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Manav"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Manav Gusain',
        title: 'help',
        helpText: 'this is some helpful text.'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, state, city, country } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                state: state,
                city: city,
                country: country,
                address: req.query.address,
            })
        })
    })



    // res.send({
    //     forecast: 'The weather here is Rainy',
    //     location: 'New York',
    //     address: req.query.address,
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {                    //makes sure that user provide a search term 
        return res.send({                       //in URL otherwise code outside if block will execute
            error: 'please provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('help article not found!!')
    res.render('404', {
        title: '404',
        name: 'Manav',
        errorMsg: 'Help article not found :('
    })
})


app.get('*', (req, res) => {        //* is called the wild-card character
    // res.send('My 404 page.')
    res.render('404', {
        title: '404',
        name: 'Manav',
        errorMsg: 'Page not found :('
    })

})


// port 3000 in local build
app.listen(process.env.PORT, () => {
    console.log('server is up on port 3000');
})



// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h1>')
// })

// app.help
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Manav',
//         age: 20
//     }])
// })


// app.store
// app.get('/about', (req, res) => {
//     res.send('<h1>this is the about page</h1>')
// })