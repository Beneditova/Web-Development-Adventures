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

var middleTopDiceElement = function () {

  var topMiddleDot = document.createElement("div");
  topMiddleDot.classList.add("middleDots");
  topMiddleDot.setAttribute("id", "topMiddleDot");

  return topMiddleDot;
};

var middleDiceElement = function () {

  var middleDot = document.createElement("div");
  middleDot.classList.add("middleDots");
  middleDot.setAttribute("id", "middleDot");

  return middleDot;
};

var lowestMiddleDiceElement = function () {

  var lowestMiddleDot = document.createElement("div");
  lowestMiddleDot.classList.add("middleDots");
  lowestMiddleDot.setAttribute("id", "lowestMiddleDot");

  return lowestMiddleDot;
};



  document.getElementById("placeholderDice").appendChild(middleTopDiceElement());
  document.getElementById("placeholderDice").appendChild(middleDiceElement());
  document.getElementById("placeholderDice").appendChild(lowestMiddleDiceElement());
