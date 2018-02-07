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

//Route to /end (GET route)
router.get('/end', (req, res) => {
	const name = req.cookies.username;
	const score = req.cookies.userScore;
	const completed = req.cookies.completedQuestions;
	const templateData = { name, score, completed }
	res.render("end", templateData);
});

//Route to /end (POST route)
router.post('/end', (req, res) => {
	res.cookie('userScore', 0);
	res.cookie('completedQuestions', 0);
	res.redirect("/");
});

//Route to /goodbye (POST route)
router.post('/goodbye', (req, res) => {
	res.clearCookie('username');	
	res.clearCookie('userScore');
	res.clearCookie('completedQuestions');
	res.clearCookie('category');
	res.clearCookie('usedQuestions');
	res.redirect("hello");
});

//Route to /category (POST route)
router.post('/category', (req, res) => {
	var category = req.body.cat;
	res.cookie('category', category);

	// store used question array in cookie
	var used = [];
	var usedJSON = JSON.stringify(used);
	res.cookie('usedQuestions', usedJSON);

	res.redirect("cards");
});


module.exports = router