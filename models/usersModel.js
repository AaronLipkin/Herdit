const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: 	{ type: String, required: true },
	password: 	{ type: String, required: true },
	posts: 		Array,
	points: 	Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
