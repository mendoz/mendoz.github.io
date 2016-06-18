(function () {

var submit = document.getElementById('newMovieForm'), // Creates a reference to movie form
	addMovie = document.getElementById('addMovie'),   // Creates a reference to Add Movie to database h3
	sortBy = document.getElementById('selectsort'),   // Creates a reference to sort drop down list
	nmHeader = document.getElementById('nmHeader'),   // Creates a reference to new movie header
    amount = document.getElementById('amount'),       // Creates a reference to balance amount
    depositArea = document.getElementById('ddd'),     // Creates a reference to deposit drop down
    dSubmit = document.getElementById('bankForm'),    // Creates a reference to deposit form
	ul = e('ul', '', {id: 'ulID'}, {}), // Creates an empty unordered list with an ID == ulID
	newMovies = [], 					// Creates an empty movie array for to store movie OBJs
    newUser = new userConstructor();

function sortMovies() {
	newMovies.sort(function (A, B) {
		var a, b;
		switch (sortBy.value) {
			case 'nameA':
				a = A.Title.toLowerCase();
				b = B.Title.toLowerCase();
				break;
			case 'nameD':
				a = B.Title.toLowerCase(); // a is set to b to flip the order 
				b = A.Title.toLowerCase(); // b is set to a to flip the order
				break;
			case 'yearA':
				a = A.Year * -1; // Year is set to negative to show most recent movies first
				b = B.Year * -1;
				break;
			case 'yearD':
				a = A.Year;
				b = B.Year;
				break;
			case 'genreA':
				a = A.Genre;
				b = B.Genre;
				break;
			case 'genreD':
				a = B.Genre; // a is set to b to flip the order
				b = A.Genre; // b is set to a to flip the order
				break;
			case 'priceA':
				a = A.getRate() * -1; // Price is set to negative to show most expensive movie first
				b = B.getRate() * -1;
				break;
			case 'priceD':
				a = A.getRate();
				b = B.getRate();
				break;
			case 'lengthA':
				a = A.Time * -1; // Time in minutes is set to negative to show longest movie first
				b = B.Time * -1;
				break;
			case 'lengthD':
				a = A.Time;
				b = B.Time;
				break;
			case 'availableA':
				a = !A.isAvailable; // isAvailable value is flipped to show available movies first
				b = !B.isAvailable;
				break;
			case 'availableD':
				a = A.isAvailable;
				b = B.isAvailable;
				break;
			default:
				break;
		}   
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	});
}

function updateLi() {
	sortMovies();
	ul.innerHTML = ""; // Removes all li from ul 
	for (var i in newMovies) {
		var li = e('li', newMovies[i].Title, {id: newMovies[i].Title + i, movieidx: i, class: 'test'}, {color: newMovies[i].getColor()}), // Creates a new list item with a value of the entered movie title
			nUl = e('ul', '', {id: 'nUl' + i, class: 'nUl'}, {}), // Creates an empty unordered list that will be nested
			descLi = e('li', 'Plot: ' + newMovies[i].Preview(), {}, {}),
			timeLi = e('li', 'Length: ' + newMovies[i].runTimeInHours(), {}, {}), // Creates lis for every movie and it's info
			yearLi = e('li', 'Released: ' + newMovies[i].Year, {}, {}),
			genreLi = e('li', 'Genre: ' + newMovies[i].Genre, {}, {}),
			rateLi = e('li', 'Daily Rate: $' + newMovies[i].getRate(), {}, {});
		nUl.appendChild(descLi);
		nUl.appendChild(timeLi);
		nUl.appendChild(yearLi); // Append lis to nested ul
		nUl.appendChild(genreLi);
		nUl.appendChild(rateLi);
		li.appendChild(nUl);     // Append nested ul to current movie li
		ul.appendChild(li);      // Append li to ul
 		document.body.appendChild(ul); // Append ul to body 
	} 
}

function updateBalance() {
	amount.innerHTML = newUser.showBalance();
}

submit.addEventListener('submit', function (evt) { // Submit button event listener
	evt.preventDefault();	// Prevents page reload after submit event 
	var currentTitle = capitalize(submit.movieTitle.value), 
		currentTime = submit.runTime.value,
		currentYear = submit.yearReleased.value, // Stores input values into local variables
		currentGenre = submit.genre.value,
		currentDesc = submit.desc.value.trim();  
	if (!currentTitle) { 	// Checks if user is submiting an empty title
		return alert('Please enter a movie title!'); // Prevents movie OBJ from being constructed if title is empty 
	}
	for (var i in newMovies) {                                             // Toms sugestion prevents date from being updated
		if (currentTitle.toLowerCase() == newMovies[i].Title.toLowerCase() /*&& currentYear == newMovies[i].Year*/) { // Checks if movie already exists 
			if (confirm(newMovies[i].Title + ' is already in our database!\nDid you want to update it\'s information?')) {
                newMovies[i].Update(currentTime, currentYear, currentGenre, currentDesc); // Prompts user if they want to update the movie info
                return updateLi(); // Updates li with new movie info
			} else {
				return; // Prevents duplicate movie from being constructed
			}
		}
	}
	// Creates a movie OBJ then adds it to the newMovies array
	newMovies.push(new movieConstructor(currentTitle, currentTime, currentYear, currentGenre, currentDesc)); 
	updateLi();
	nmHeader.setAttribute('style', 'display: block'); // Makes new movie header visable 
	console.log(newMovies);
} );

ul.addEventListener('click', function (evt) { // Click on li event listener
	submit.setAttribute('style', 'display: none'); // Hides form
	for (var i in newMovies) {
		if (evt.target.getAttribute('movieidx') == i) {	 // Checks if li user clicked on matches a movie in our Array
			if (confirm('Did you want to check ' + newMovies[i].Title + ((newMovies[i].isAvailable) ? ' out?' : ' in?') + newMovies[i].costInfo())) { 
                if (!newMovies[i].isAvailable && newUser.Withdraw(newMovies[i].Cost) == -1) { // Checks if user can afford to check movie in
                    return alert('Insufficient funds )\':');
                }
                newMovies[i].checkInOrOut(); // Flips the isAvailable variable 
                updateLi();
                updateBalance();
		    }
		}
	}
} );

ul.addEventListener('mouseover', function (evt) { // Hover over li event listener
    for (var i in newMovies) {
        if (evt.target.getAttribute('movieidx') == i) {   // Gets the index of the li the user is hovering on
            var nUl = document.getElementById('nUl' + i); // Gets the nested ul from the parent user is hovering on
            nUl.setAttribute('style', 'display: block');  // Makes the nested ul visable 
            break; 
        } 
    }
    
} );

ul.addEventListener('mouseleave', function (evt) { 
    var nUl = document.getElementsByClassName('nUl'); // Gets all elements with class name nUl
    for (var i in nUl) { 
        nUl[i].setAttribute('style', 'display: none'); // Loops through every element and hides them 
        // Throws error yet some how works?? 
    }
} ); 

addMovie.addEventListener('click', function () {
	submit.setAttribute('style', 'display: block'); // Show form when user clicks on add movie header
} );

sortBy.addEventListener('change', function () { // Updates ul when user slects a sort option
	updateLi();
} );

amount.addEventListener('click', function () { // Shows deposit form when user clicks on balance amount
    depositArea.setAttribute('style', 'display: block');
} );

depositArea.addEventListener('mouseleave', function () { // Hides deposit form when users cursor leaves the form
    depositArea.setAttribute('style', 'display: none');
} );

dSubmit.addEventListener('submit', function (evt) { // Updates balance
    evt.preventDefault();
    var depositAmount = dSubmit.deposit.value;
    newUser.Deposit(depositAmount);
    updateBalance();
} );

} () );