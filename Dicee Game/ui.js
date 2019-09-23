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

var middleDiceElements = function () {

  var topMiddleDot = document.createElement("div");
  topMiddleDot.classList.add("middleDots");
  topMiddleDot.setAttribute("id", "topMiddleDot");

  var middleDot = document.createElement("div");
  middleDot.classList.add("middleDots");
  middleDot.setAttribute("id", "middleDot");

  var lowestMiddleDot = document.createElement("div");
  lowestMiddleDot.classList.add("middleDots");
  lowestMiddleDot.setAttribute("id", "lowestMiddleDot");

  var middleElements = [topMiddleDot, middleDot, lowestMiddleDot];

  return middleElements;
};

var leftDiceElements = function () {

  var topLeftDot = document.createElement("div");
  topLeftDot.classList.add("leftDots");
  topLeftDot.setAttribute("id", "topLeftDot");

  var middleLeftDot = document.createElement("div");
  middleLeftDot.classList.add("leftDots");
  middleLeftDot.setAttribute("id", "middleLeftDot");

  var lowestLeftDot = document.createElement("div");
  lowestLeftDot.classList.add("leftDots");
  lowestLeftDot.setAttribute("id", "lowestLeftDot");

  var leftElements = [topLeftDot, middleLeftDot, lowestLeftDot];

  return leftElements;
};

var rightDiceElements = function () {

  var topRightDot = document.createElement("div");
  topRightDot.classList.add("rightDots");
  topRightDot.setAttribute("id", "topRightDot");

  var middleRightDot = document.createElement("div");
  middleRightDot.classList.add("rightDots");
  middleRightDot.setAttribute("id", "middleRightDot");

  var lowestRightDot = document.createElement("div");
  lowestRightDot.classList.add("rightDots");
  lowestRightDot.setAttribute("id", "lowestRightDot");

  var rightElements = [topRightDot, middleRightDot, lowestRightDot];

  return rightElements;
};

for (var i = 0; i < middleDiceElements().length; i++) {
document.getElementById("placeholderDice").appendChild(middleDiceElements()[i]);
}

for (var i = 0; i < leftDiceElements().length; i++) {
document.getElementById("placeholderDice").appendChild(leftDiceElements()[i]);
}

for (var i = 0; i < rightDiceElements().length; i++) {
document.getElementById("placeholderDice").appendChild(rightDiceElements()[i]);
}
