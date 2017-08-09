const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const User 			 = require('./models/usersModel.js')
const Post 			 = require('./models/postsModel.js')
const session        = require('express-session');


app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
	  secret: "this is a random string secret", //a random string do not copy this value or your stuff will get hacked
	  resave: false,
	  saveUninitialized: false
	 
}));

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController);
const postsController = require('./controllers/postsController.js');
app.use('/posts', postsController);
const sessionsController = require('./controllers/sessionsController.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res)=>{
	User.findOne({username : req.session.username}, (err,foundUser) => {
		Post.find({}, (err, foundPosts) => {
			res.render('index.ejs', {
				posts: foundPosts,
				user: req.session.username,
				logged: req.session.logged,
				UserObject: foundUser
			});
		})
	})
});



var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/herdit';

mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log('listening....');
});
