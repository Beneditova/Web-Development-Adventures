
function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function diceRoll () {

    var randomNumbersHolder=(Math.floor(Math.random() * 10));
    return randomNumbersHolder;
  };

var dice = new Dice(6);


function getDot(number) {
  for (var i = 0; i < number; i++) {
    var dot = document.getElementById("dice_dot_"+(i+1));
    dot.innerHTML = style.color = 'blue';
  }
}

var randomNumbersRoll = function(){
  var result = dice.roll();
  return result;
};

var button = document.getElementById("button");

button.onclick = function() {
    randomNumbersRoll();
  };

 console.log(randomNumbersRoll());

var allDice = document.getElementsByClassName("yahtzee_die");

for(i = 0; i < allDice.length;i++)
{
    allDice[i].style.backgroundColor='blue';
    var dotche =  document.getElementById("dice_dot_1");
    dotche.style.backgroundColor='white';

  }

//getElement => on doc ready
