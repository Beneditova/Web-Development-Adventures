function printNumber(number) {
  var placeholder = document.getElementById("placeholder");
  placeholder.innerHTML = number;
}

var button = document.getElementById("button");
var result;

button.onclick = function() {
   result = dice.roll();
  printNumber(result);

};
console.log(result);

var createDiceElement = function (result) {

  var firstDice = document.createElement("div");
  firstDice.classList.add("firstDot");

  return firstDice;
};

  document.getElementById("main").appendChild(createDiceElement(result));
