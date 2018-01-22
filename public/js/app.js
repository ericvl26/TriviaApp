
	// const hint = document.querySelector('.hint');
	// if (hint) {
	// 	const hintShowButton = document.createElement('BUTTON');
	// 	hintShowButton.textContent = "Show hint";
	// 	hint.parentNode.insertBefore(hintShowButton, hint);
	// 	hint.style.display = 'none';

	// 	hintShowButton.addEventListener('click', (e) => {
	// 		hint.style.display = '';
	// 		e.target.style.display = 'none';
	// 	})

	// 	hint.addEventListener('click', (e) => {
	// 		hint.style.display = 'none';
	// 		hintShowButton.style.display = '';
	// 	})
	// }


            // //Remove any event handlers..if they exist.  Reset*
            // $(audio[i]).off();

            // // Add listener to auto play next track
            // $(audio[i]).on('ended', function() {
            //   audio[i+1].play();
            //   audio[i].currentTime = 0; 
            // });

document.addEventListener('DOMContentLoaded', (e) => {

	const divAnswers = document.querySelectorAll('.answerText');
	const nextButton = document.querySelector('.nextBtn');
	nextButton.style.display = 'none';

	// console.log($('.answerText'))

	divAnswers.forEach(function(answerDiv) {
		answerDiv.addEventListener('click', function(event) {

			// display 'next question' button
			nextButton.style.display = '';
			this.style.backgroundColor = 'red';

			var input = this.querySelector('input');
			var inputValue = input.value;
			input.checked = 'true';

			inputs = document.querySelectorAll('input[type=radio');
			// disable unchecked radio inputs
			inputs.forEach(function(input) {
				if (!input.checked) {
					input.disabled = 'true';
				}
			})
			// jquery equivalent below
			// $(':radio:not(:checked)').attr('disabled', true);


			console.log(inputValue);

			if (inputValue === 't') {
				// mark green if correct answer
				this.style.backgroundColor = '#b0f1b0';
			} else {
				// mark red if wrong answer & mark correct answer
				this.style.backgroundColor = '#f527278a';
				divAnswers.forEach(function(a) {
					if (a.querySelector('input').value === 't') {
						// mark correct answer
						a.style.backgroundColor = '#b0f1b0';
					}
				})
			}

			// // clone #content div to remove all event listeners after the user has selected an answer
			var old_element = document.getElementById("content");
			var new_element = old_element.cloneNode(true);
			old_element.parentNode.replaceChild(new_element, old_element);
		})
	})
});