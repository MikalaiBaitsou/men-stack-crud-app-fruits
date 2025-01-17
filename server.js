// load our environment variables
const dotenv = require('dotenv')
dotenv.config()// load the variables from .env file!

const express = require('express')
const mongoose = require('mongoose')
//initailize the express app
const app = express()


// import the model to talk to the db
const FruitModel = require('./models/fruit')

// Connect our express server to the database!
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', function(){
	console.log('Express has establised a connection with MongoDB')
})

// middleware to process the form requests
// so our routes can access req.body which is the contents of the form
app.use(express.urlencoded({ extended: false }));



app.get('/', function(req, res){
	res.render('index.ejs')
})

app.get('/fruits', async function(req, res){
	// get all of the fruits from the db!

	const allFruitDocs = await FruitModel.find({})
	console.log(allFruitDocs)

	res.render('fruits/index.ejs', {fruitDocs: allFruitDocs})
})


app.get('/fruits/new', function(req, res){

	// render always looks in the views folder
	// for the our ejs filesres.render('fruits/new.ejs')!
	res.render('fruits/new.ejs')
})

app.post('/fruits', async function(req, res){

	// to access the contents of the form
	console.log(req.body, " <- body of our request")
	if(req.body.isReadyToEat === 'on'){
		req.body.isReadyToEat = true
	} else {
		req.body.isReadyToEat = false
	}

	// one line of if/else
	// req.body.isReadyToEat = !!req.body.isReadyToEat


	// req.body is the contents of the form that we want to put in the 
	// db
	const fruitDoc = await FruitModel.create(req.body)
	console.log(fruitDoc)
	res.redirect('/fruits') // tell the client to make a get
	// request to /fruits 
})


app.listen(3000, function(){
	console.log('Listening on Port 3000')
})