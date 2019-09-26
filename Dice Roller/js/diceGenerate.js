var dice = {
sides: 6,
roll: function () {
  var sides = 6;
  var randomNumber = Math.floor(Math.random() * this.sides) + 1;
  return (randomNumber);
}};

function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function diceRoll () {
  var randomNumbersHolder;

  for (var i = 0; i < array.length; i++) {
    randomNumbersHolder.push(Math.floor(Math.random() * this.sides) + 1);
  }

    return randomNumbersHolder;
  };

var dice = new Dice(6);
