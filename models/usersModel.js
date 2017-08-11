const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: 	{ type: String, required: true, unique: true },
	password: 	{ type: String, required: true },
	posts: 		[],
	likedPosts: Array,
	dislikedPosts: Array,
	points: 	Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
