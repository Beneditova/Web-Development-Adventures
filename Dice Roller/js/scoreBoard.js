
resultsArray = [0,0,0,0,0,0];

for (var i = 0; i <= 4; i++) {
	if (dices[i] == 1) {
	resultsArray[0]++;
	} else if (dices[i] == 2) {
	resultsArray[1]++;
	} else if (dices[i] == 3) {
	resultsArray[2]++;
	} else if (dices[i] == 4) {
	resultsArray[3]++;
	} else if (dices[i] == 5) {
	resultsArray[4]++;
	} else {
	resultsArray[5]++;
	}
}

// Finds and stores the biggest number in the resultsArray
var largestAmount = Math.max.apply(Math,resultsArray);

// Counts and stores how many twos (Pairs) are (For the Double Pair and Fullhouse check)
var countTwos = 0;
for (index = 0; index < resultsArray.length; index++) {
	if (resultsArray[index] == 2)
	countTwos++;
}


