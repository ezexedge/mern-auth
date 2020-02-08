const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>console.log('db connect'))
.catch(err => console.log('db conection error', err))


const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.use(morgan('dev'))
///app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

if((process.env.NODE_ENV = 'development')){
    app.use(cors({origin : `http://localhost:3000`}))
}


app.use('/api',authRoutes)
app.use('/api',userRoutes)


const port =  process.env.PORT || 8000
app.listen(port , ()=>{
    console.log('funciona')
})