const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: 		{ type : String, required : true },
	user: 		{ type : Object },
	desc: 		String,
	posted:     Number, 
	link: 		{ type : String, required : true },
	likes: 		{ type : Number, default : 0 },
	dislikes: 	{ type : Number, default : 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
