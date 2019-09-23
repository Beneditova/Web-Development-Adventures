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

for (var i = 0; i < middleDiceElement().length; i++) {
document.getElementById("placeholderDice").appendChild(middleDiceElement()[i]);
}
