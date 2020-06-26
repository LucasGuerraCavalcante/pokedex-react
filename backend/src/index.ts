import express from 'express'
import cors from 'cors'

// import routes from './routes'

const app = express()

app.use(cors())

// app.use(routes)

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const port = 3333

app.listen(port, function() {
    console.log(`\nServer listening on http://localhost:${port}/`)
})