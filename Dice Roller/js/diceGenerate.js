/*
function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function diceRoll () {
    var randomNumbersHolder = [0,0,0,0,0,0];
   
    for(var i=0; i< randomNumbersHolder.length; i++) {
      randomNumbersHolder[i]=(Math.floor(Math.random()* 6)+1);
    }
    
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
      var index =0;
     
      var diceNumber= randomNumbersRoll();
      var visibleDots = diceSides[diceNumber[index]];
      var holder = document.getElementById(dice);
      
      index++;

      for(var i=0; i< visibleDots.length; i++) {
     
      var dot = holder.querySelectorAll(`[data-id="${visibleDots[i]}"]`)[0];
      dot.classList.add('colored');
     }
    })
     
  }
   
  window.onload = rollDice();
  
  var button = document.getElementById('button');
  button.addEventListener('click', rollDice);
 
 var table = document.createElement('table');
  for (var i = 1; i < 4; i++){
    var tr = document.createElement('tr');   

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var text1 = document.createTextNode('Text1');
    var text2 = document.createTextNode('Text2');

    td1.appendChild(text1);
    td1.classList.add('table-content')
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}
document.body.appendChild(table);



var table = document.createElement('table');
  for (var i = 1; i < 4; i++){
    var tr = document.createElement('tr');   

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var text1 = document.createTextNode('Text1');
    var text2 = document.createTextNode('Text2');

    td1.appendChild(text1);
    td1.classList.add('table-content')
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}
document.body.appendChild(table);

*/
var Points = [
  {"Name":"Aces", "Score":0},
  {"Name":"Twos", "Score":0},
  {"Name":"Threes", "Score":0},
  {"Name":"Fours", "Score":0},
  {"Name":"Fives", "Score":0},
  {"Name":"Sixes", "Score":0},
];	

function buildTable(data) {
  var table = document.createElement("table");
  table.className="gridtable";
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");
  var headRow = document.createElement("tr");
  ["Name","Score"].forEach(function(el) {
    var th=document.createElement("th");
    th.appendChild(document.createTextNode(el));
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead); 
  data.forEach(function(el) {
    var tr = document.createElement("tr");
    for (var o in el) {  
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el[o]))
      tr.appendChild(td);
    }
    tbody.appendChild(tr);  
  });
  table.appendChild(tbody);             
  return table;
}

document.body.appendChild(buildTable(Points));
