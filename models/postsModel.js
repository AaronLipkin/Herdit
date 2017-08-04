const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: 		{ type : String, required : true },
	user: 		{ type : String },
	desc: 		String,
	link: 		{ type : String, required : true },
	likes: 		{ type : Number, default : 0 },
	dislikes: 	{ type : Number, default : 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
