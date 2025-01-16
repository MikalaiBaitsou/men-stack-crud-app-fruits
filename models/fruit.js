const mongoose = require('mongoose')

// schema defines the shape of our documents
const fruitSchema = new mongoose.Schema({
	name: String,
	isReadyToEat: Boolean
})

// initialize the model which creates the collection in mongodb (aka the buckedt)
// and returns the object we can use to perform CRUD on the collection in the db
const Fruit = mongoose.model('Fruit', fruitSchema)

// export the object to use in other files!
module.exports = Fruit