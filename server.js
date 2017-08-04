const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const User 			 = require('./models/usersModel.js')
const Post 			 = require('./models/postsModel.js')
// const session        = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));


// const authorsController = require('./controllers/users.js');
// app.use('/users', authorsController);
const postsController = require('./controllers/postsController.js');
app.use('/posts', postsController);
// const sessionsController = require('./controllers/session.js');
// app.use('/sessions', sessionsController);

app.get('/', (req, res)=>{
	Post.find({}, (err, foundPosts) => {
		res.render('index.ejs', {
			posts: foundPosts
		});
	})
});

mongoose.connect('mongodb://localhost:27017/herdit');

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

app.listen(3000, ()=>{
	console.log('listening....');
});
