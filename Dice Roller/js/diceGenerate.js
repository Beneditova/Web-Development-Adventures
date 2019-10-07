
function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function diceRoll () {

    var randomNumbersHolder=(Math.floor(Math.random() * 10));
    return randomNumbersHolder;
  };

var dice = new Dice(6);



var randomNumbersRoll = function(){
  var result = dice.roll();
  return result;
};

var button = document.getElementById("button");

 console.log(randomNumbersRoll());

 var diceSides = {
    1: ["dice_dot_5"],
    2: ["dice_dot_2", "dice_dot_8"],
    3: ["dice_dot_3", "dice_dot_5", "dice_dot_7"],
    4: ["dice_dot_1", "dice_dot_3", "dice_dot_7", "dice_dot_9"],
    5: ["dice_dot_1", "dice_dot_3", "dice_dot_5", "dice_dot_7", "dice_dot_9"],
    6: ["dice_dot_1", "dice_dot_3", "dice_dot_4", "dice_dot_6", "dice_dot_7", "dice_dot_9"]
  };
   
  var dices = ["dice_1", "dice_2", "dice_3", "dice_4", "dice_5", "dice_6"];
   
 
  function clearOldDice() {
    var coloredDice = [].slice.call(document.getElementsByClassName('colored'));
    if (coloredDice.length) {
      coloredDice.forEach(el => el.classList.remove('colored'));
    }  
  }
   
  function rollDice() {
    clearOldDice();
    
    dices.forEach(dice => {
      var diceNumber= (Math.floor(Math.random()* 6)+1);
      var visibleDots = diceSides[diceNumber];
      var holder = document.getElementById(dice);
     
   
    for(var i=0; i< visibleDots.length; i++) {
     
      var dot = holder.querySelectorAll(`[data-id="${visibleDots[i]}"]`)[0];
      dot.classList.add('colored');
    }
    })
     
  }
   
  window.onload = rollDice();
  
  var button = document.getElementById('button');
  button.addEventListener('click', rollDice);


