var diceElements = function () {

  var dice_dot_1 = document.createElement("div");
  dice_dot_1.classList.add("leftDots");
  dice_dot_1.setAttribute("id", "dice_dot_1");

  var dice_dot_2 = document.createElement("div");
  dice_dot_2.classList.add("leftDots");
  dice_dot_2.setAttribute("id", "dice_dot_2");

  var dice_dot_3 = document.createElement("div");
  dice_dot_3.classList.add("leftDots");
  dice_dot_3.setAttribute("id", "dice_dot_3");

  var dice_dot_4 = document.createElement("div");
  dice_dot_4.classList.add("middleDots");
  dice_dot_4.setAttribute("id", "dice_dot_4");

  var dice_dot_5 = document.createElement("div");
  dice_dot_5.classList.add("middleDots");
  dice_dot_5.setAttribute("id", "dice_dot_5");

  var dice_dot_6 = document.createElement("div");
  dice_dot_6.classList.add("middleDots");
  dice_dot_6.setAttribute("id", "dice_dot_6");



  var diceDotElements = [dice_dot_1, dice_dot_2, dice_dot_3, dice_dot_4,
  dice_dot_5, dice_dot_6];

  return diceDotElements;
};



for (var i = 0; i < diceElements().length; i++) {
document.getElementById("dice_1").appendChild(diceElements()[i]);
}
