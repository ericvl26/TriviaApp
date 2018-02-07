const express = require('express');
const router = express.Router();

const { data } = require('../data/triviaData.json');
const { questions } = data;

const maxQuestions = 5;
// var usedQuestions = [];

// const { data1 } = require('../data/flashcardData.json');
// const { cards } = data1;
//^^ es6 equivalent above
// const data = require('..data/flashcardData.json').data;
// const cards = data.cards;

// Route to /cards (GET route)
router.get('/', (req, res) => {

	const category = req.cookies.category;
	const numberOfQuestions = questions[category].length;
	var questionId;

	// recall previously used questions array from cookie
	let prevUsedQ = req.cookies.usedQuestions;
	let usedQuestions = JSON.parse(prevUsedQ);

	// set questionId to a new question.  Reset if question has already been asked.  
	do {
 		questionId = Math.floor( Math.random() * numberOfQuestions );
	}
	while (usedQuestions.includes(questionId));

	// updated used questions array
	usedQuestions.push(questionId);
	let questionJSON = JSON.stringify(usedQuestions);
	// console.log(usedQuestions);
	res.cookie('usedQuestions', questionJSON);
	
	res.redirect(`/cards/${questionId}`);
});

// Route to /cards/:id (GET route)
// treats text after : as a variable in route => req.params.id
router.get('/:id', (req, res) => {

	//req.query.side => gets value from http://localhost:3000/cards/4?side=answer  (*query string)
	// const { side } = req.query

	const { id } = req.params;

	const name = req.cookies.username;
	const category = req.cookies.category;

	// Arrange answers into an array and sort.
	const questionText = questions[category][id]['question'];

	let answers = questions[category][id]['incorrect_answers'];

	// map incorrect answers 
	var answerArr = answers.map(function(answer) {
		let answerObject = {};
		answerObject.text = answer;
		answerObject.correct = 'f';
		return answerObject;
	});

	// map correct answer
	var correctAnswer = {};
	correctAnswer.text = (questions[category][id]['correct_answer']);
	correctAnswer.correct = 't';

	// add correct answer to array
	answerArr.push(correctAnswer);

	// sort answers alphabetically
	answerArr.sort(function(a, b) {
		var ansA = a.text.toUpperCase(); // ignore upper and lowercase
	  	var ansB = b.text.toUpperCase(); // ignore upper and lowercase
	  	if (ansA < ansB) {
	   		return -1;
	  	}
	  	if (ansA > ansB) {
	    	return 1;
	  	}
	  	// names must be equal
	  	return 0;
	})

	// console.log(answerArr);

	const templateData = { id, questionText, answerArr, name }

	res.render("card", templateData);
});

//Route to /cards (POST route)
//submit answer
router.post('/', (req, res) => {

	var score = req.cookies.userScore;
	var completed = req.cookies.completedQuestions;
	var userAnswer = req.body.ans;
	console.log(userAnswer);

	// increase score if answered correctly
	if (userAnswer === 't') {
		score++;
	}

	// track number of questions that have been answered
	completed++;

	// update cookies
	res.cookie('userScore', score);
	res.cookie('completedQuestions', completed);

	// end game after X questions.
	if (completed >= maxQuestions) {
		res.redirect("/end");
	} else {
		res.redirect("/cards");
	}
	
});


module.exports = router;