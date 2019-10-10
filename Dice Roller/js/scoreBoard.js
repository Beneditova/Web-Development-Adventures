
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
var largestAmount = Math.max(...resultsArray);

var array = [];
var findBiggestNumber = function(array){
    var currentMax =0;
    for(var i=0; i< array.length; i++)
    {
         if(array[i]>currentMax){
             currentMax= array[i];
         }
    }
    return currentMax;
}

// Counts and stores how many twos (Pairs) are (For the Double Pair and Fullhouse check)
var countTwos = 0;

for (i = 0; i < resultsArray.length; i++) {
	if (resultsArray[i] == 2)
	countTwos++;
}

if (largestAmount == 5) {
   
    // Adds +1 (line 7) to the relevant index position that will be used to calculate the final % (line 16)
    percentArray[7]++;
   
    // Displays all the stats for everything when a yahtzee happens (end of the loop)
    console.log("\n" + diceToss + " || " + dices + " || ***** || YAHTZEE" + "\n \n" + percentArray[7] + " Yahtzee: \t" + percent(percentArray[7]) + "%\n" + percentArray[6] + " Four: \t" + percent(percentArray [6]) + "%\n" + percentArray[5] + " Fullhouse: \t" + percent(percentArray[5]) + "%\n" + percentArray[4]  + " Three: \t" + percent(percentArray[4]) + "%\n" + percentArray[3] + " Two Pairs: \t" + percent (percentArray[3]) + "%\n" + percentArray[2] + " Pair: \t" + percent(percentArray[2]) + "%\n" + percentArray[1] + " Straight: \t" + percent(percentArray[1]) + "%\n" + percentArray[0] + " High Num: \t" + percent(percentArray[0]) + "%");
        } else if (largestAmount == 4) {
        percentArray[6]++;
        console.log(diceToss + " || " + dices + " ||  **** || Four");
   
        // largest amount of same numbers three, and there is a two
        } else if (largestAmount == 3 && countTwos == 1) {
        percentArray[5]++;
        console.log(diceToss + " || " + dices + " || ··*** || Fullhouse");
        } else if (largestAmount == 3) {
        percentArray[4]++;
        console.log(diceToss + " || " + dices + " ||   *** || Three");
   
        // largest amount of same numbers two, and there are two twos
        } else if (largestAmount == 2 && countTwos == 2) {
        percentArray[3]++;
        console.log(diceToss + " || " + dices + " ||  ··** || Two");
        } else if (largestAmount == 2) {
        percentArray[2]++;
        console.log(diceToss + " || " + dices + " ||    ** || Pair");
    }
