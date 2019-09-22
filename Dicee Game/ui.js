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

var middleDiceElement = function () {

  var firstDice = document.createElement("div");
  firstDice.classList.add("middleDots");

  return firstDice;
};

  document.getElementById("topMiddleDot").appendChild(middleDiceElement());
  document.getElementById("middleDot").appendChild(middleDiceElement());
  document.getElementById("lowestMiddleDot").appendChild(middleDiceElement());
