const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: 		{ type : String, required : true },
	user: 		{ type : Object },
	artist: 	String,
	posted:     Number, 
	link: 		{ type : String, required : true },
	embed: 		{ type : String },
	likes: 		{ type : Number, default : 0 },
	dislikes: 	{ type : Number, default : 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
