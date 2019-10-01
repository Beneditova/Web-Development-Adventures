

function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function diceRoll () {
  var randomNumbersHolder= [];

  for (var i = 0; i < this.sides.length; i++) {
    randomNumbersHolder.push(Math.floor(Math.random() * 10));
  }

    return randomNumbersHolder;
  };

var dice = new Dice(6);


function getDot(number) {
  var placeholder = document.getElementById("dice_dot_"+number);
  placeholder.innerHTML = number;
}

var button = document.getElementById("button");


button.onclick = function() {
  var result = dice.roll();

  return result;
  };


var allDice = document.getElementsByClassName("yahtzee_die");

for(i = 0; i < allDice.length;i++)
{
  for (var j = 0; j < button.onclick().length; j++) {
    allDice[i].style.color = 'red';
  }
}

//getElement => on doc ready
