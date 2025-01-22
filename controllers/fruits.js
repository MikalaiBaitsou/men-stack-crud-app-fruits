const express = require('express')
const router = express.Router()
const FruitModel = require('../models/fruit')

router.delete('/:fruitId', async function(req, res){

	const deletedFruit = await FruitModel.findByIdAndDelete(req.params.fruitId)

	res.redirect('/')
})


router.get('/:fruitId/edit', async function(req, res){
	const foundFruit = await FruitModel.findById(req.params.fruitId);
	console.log(foundFruit);
	res.render('fruits/edit.ejs', {fruitDoc: foundFruit})
})

router.put('/:fruitId', async function(req, res){
	// make sure that our checkbox is changed to a boolean
	console.log(req.body)
	req.body.isReadyToEat = !!req.body.isReadyToEat
	const foundFruit = await FruitModel.findByIdAndUpdate(req.params.fruitId, req.body, {new: true});
	console.log(foundFruit)
	res.redirect(`/fruits/${foundFruit._id}`)
})


router.get('/', async function(req, res){
	// get all of the  from the db!

	const allFruitDocs = await FruitModel.find({})
	// console.log(allFruitDocs)

	res.render('fruits/index.ejs', {fruitDocs: allFruitDocs})
})

router.get('/new', function(req, res){

	// render always looks in the views folder
	// for the our ejs filesres.render('/new.ejs')!
	res.render('fruits/new.ejs')
})


// the new route must be defined before the show, because params are catch alls
router.get('/:fruitId', async function(req, res){
	console.log(req.params.fruitId, " <- req.params.fruitId")

	// using the id from the request, 
	// tell the model to go find that specific fruit from the database!
	const fruitDoc = await FruitModel.findById(req.params.fruitId)
	console.log(fruitDoc)

	res.render('fruits/show.ejs', {fruitDoc: fruitDoc})
})



router.post('/', async function(req, res){

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
	res.redirect('/') // tell the client to make a get
	// request to / 
})

module.exports = router;