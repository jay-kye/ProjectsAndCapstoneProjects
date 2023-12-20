const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


//function to check the user input value with 'fruit' array and it will return the result to 'results' array 
function search(str) {
	let results = [];
	const userSearch = str.toLowerCase();

	fruit.forEach((fruitName, i) => {
		fruitName = fruit[i].toLocaleLowerCase();
		if (fruitName.includes(userSearch)){
			results.push(fruit[i]);
		}
	})
return results;
}

// when event('keyup') happens, this function gets the value
// and return its value array as parameters to showSuggestions function.
input.addEventListener('keyup', searchHandler);
function searchHandler(e) {
	const inputVal = e.target.value;
	
	//clear suggestions if there is no inputvalue
	if(!inputVal){
		suggestions.innerHTML = '';
		return;
	}
	
	const results = search(inputVal);
	showSuggestions(results, inputVal);	
}


function showSuggestions(results, inputVal) {
	suggestions.innerHTML = ''; // Clear existing suggestions
	
	const maxSuggestions = 5; // # of maximum suggestions shown
	// it will show the # of suggestions of minimum between results length or maximum number which is 5
	

	for (inputVal = 0; inputVal < Math.min(results.length, maxSuggestions); inputVal++) {
	// i.e., if user entered 'ki', there is only 1 result then it shows 1 suggestion. 
		  // if user entered 'ap', there is 7 results, then it shows up to 5 and create 'li' of suggestions

	  const li = document.createElement('li');
	  li.innerHTML = results[inputVal]; // Add a new suggestion
	  suggestions.appendChild(li);
	}
}

// when user click the suggestion, this function return it back to userinput 
// and clear suggestions after selecting one
suggestions.addEventListener('click', useSuggestion);
function useSuggestion(e) {
	const clickedSuggestion = e.target.innerHTML;
	input.value = clickedSuggestion
	suggestions.innerHTML = ''; // Clear suggestions after selecting one
}
