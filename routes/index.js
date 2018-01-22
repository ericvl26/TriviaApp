const express = require('express');
const router = express.Router();

var empty = [];

//Route to root
router.get('/', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.render('index', { name });
		//^^ es6: { name }  is equivalent to { name: namevalue }		
	} else {
		res.redirect('hello');
	}
});
//^^ Renders index.pug html template file

//Route to /hello (GET route)
router.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.redirect('/')
	} else {
		res.render("hello");
	}
});

//Route to /hello (POST route)
router.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.cookie('userScore', 0);
	res.cookie('completedQuestions', 0);
	res.redirect("/");
});

//Route to /goodbye (POST route)
router.post('/goodbye', (req, res) => {
	res.clearCookie('username');	
	res.clearCookie('userScore');
	res.clearCookie('completedQuestions');
	res.redirect("hello");
});

module.exports = router