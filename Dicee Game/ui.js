function printNumber(number) {
  var placeholder = document.getElementById("placeholder");
  placeholder.innerHTML = number;
}

var button = document.getElementById("button");

button.onclick = function() {
  var result = dice.roll();
  printNumber(result);
};

var createDiceElement = function () {
  var div = document.createElement("div");
  div.style.width = "58px";
  div.style.height = "54px";
  div.style.background = "red";
  div.style.borderRadius = "64%";
  div.style.color = "white";
  div.style.marginLeft = "48%";
  div.style.marginTop= "-13%";
  div.innerHTML = "Hello";

  return div;
};


document.getElementById("main").appendChild(createDiceElement());
