var diceLeftElements = function () {

  var dice_dot_1 = document.createElement("div");
  dice_dot_1.classList.add("leftDots");
  dice_dot_1.setAttribute("id", "dice_dot_1");

  var dice_dot_2 = document.createElement("div");
  dice_dot_2.classList.add("leftDots");
  dice_dot_2.setAttribute("id", "dice_dot_2");

  var dice_dot_3 = document.createElement("div");
  dice_dot_3.classList.add("leftDots");
  dice_dot_3.setAttribute("id", "dice_dot_3");

 var diceDotElements = [dice_dot_1, dice_dot_2, dice_dot_3];

  return diceDotElements;
};

var diceMiddleElements = function () {

    var dice_dot_4 = document.createElement("div");
    dice_dot_4.classList.add("middleDots");
    dice_dot_4.setAttribute("id", "dice_dot_4");

    var dice_dot_5 = document.createElement("div");
    dice_dot_5.classList.add("middleDots");
    dice_dot_5.setAttribute("id", "dice_dot_5");

    var dice_dot_6 = document.createElement("div");
    dice_dot_6.classList.add("middleDots");
    dice_dot_6.setAttribute("id", "dice_dot_6");
    var diceDotElements = [dice_dot_4, dice_dot_5, dice_dot_6];

    return diceDotElements;
};

var diceRightElements = function () {

    var dice_dot_7 = document.createElement("div");
    dice_dot_7.classList.add("rightDots");
    dice_dot_7.setAttribute("id", "dice_dot_7");

    var dice_dot_8 = document.createElement("div");
    dice_dot_8.classList.add("rightDots");
    dice_dot_8.setAttribute("id", "dice_dot_8");

    var dice_dot_9 = document.createElement("div");
    dice_dot_9.classList.add("rightDots");
    dice_dot_9.setAttribute("id", "dice_dot_9");

    var diceDotElements = [dice_dot_7, dice_dot_8, dice_dot_9];

    return diceDotElements;
};

for (var i = 0; i < diceLeftElements().length; i++) {
  for (var j = 1; j < 7; j++) {
    document.getElementById("left_"+j).appendChild(diceLeftElements()[i]);
  }
}

for (var i = 0; i < diceMiddleElements().length; i++) {
  for (var j = 1; j < 7; j++) {
    document.getElementById("middle_"+j).appendChild(diceMiddleElements()[i]);
  }
}

for (var i = 0; i < diceRightElements().length; i++) {
  for (var j = 1; j < 7; j++) {
    document.getElementById("right_"+j).appendChild(diceRightElements()[i]);
  }
}
