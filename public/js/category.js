//category page
document.addEventListener('DOMContentLoaded', (e) => {

	const divCats = document.querySelectorAll('.catText');
	const getStarted = document.querySelector('.getStarted');
	getStarted.style.display = 'none';

	divCats.forEach(function(catDiv) {
		catDiv.addEventListener('click', function(event) {

			// display 'Begin!' button
			getStarted.style.display = '';

			divCats.forEach(function(divCat) {
				divCat.style.backgroundColor = '';
				divCat.style.color = '';
			})

			this.style.backgroundColor = '#bb723cb3';
			this.style.color = '#fff';

			var input = this.querySelector('input');
			var inputValue = input.value;
			input.checked = 'true';

			console.log(inputValue);


		})
	})

});