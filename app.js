const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

//set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
//set up cookieParser
app.use(cookieParser());
//links to static assets; CSS, ect
app.use('/static', express.static('public'))

//app.set -- express settings for template
app.set('view engine', 'pug');

//import routes modules from routes folder
const mainRoutes = require('./routes');
//^^ Index route
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes)

//Middleware, (req, res, next).  App.use w/ next ~ run in order that they appear in code
app.use((req, res, next) => {
	console.log('Hello');
	next();
	//^^ requires next() function to move forward
});

app.use((req, res, next) => {
	console.log('World');
	next();
});



//Create error if user goes to page that doesnt exist.  If all code above runs without finding a matching route, then this code will run.
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
})

//Handles an error if one exists
app.use((err, req, res, next) => {
	//set locals on response object
	res.locals.error = err
	res.status(err.status);
	res.render('error');
});

//set up development server.   port:3000.
app.listen(3000, () => {
	console.log('The application is running on localhost:3000!')
});





// pug example:loop over array 'colors' in pug
// ul
// 	each color in colors
// 		li= color

