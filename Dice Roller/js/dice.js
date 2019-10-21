const yahtzee_dice = document.querySelectorAll('.yahtzee_die');

class Die {
  
  constructor(selector){
    var self = this; 
   
    this._selector = selector;
   
    this.element = document.querySelector(this._selector);

    this.currentDie = 0;

    this.selectedState = false;
  
    this.diceDots = {
      1: ["dice_dot_5"],
      2: ["dice_dot_2", "dice_dot_8"],
      3: ["dice_dot_3", "dice_dot_5", "dice_dot_7"],
      4: ["dice_dot_1", "dice_dot_3", "dice_dot_7", "dice_dot_9"],
      5: ["dice_dot_1", "dice_dot_3", "dice_dot_5", "dice_dot_7", "dice_dot_9"],
      6: ["dice_dot_1", "dice_dot_3", "dice_dot_4", "dice_dot_6", "dice_dot_7", "dice_dot_9"]
    };
   
    window.onload = ()=> {
      this.element.addEventListener('click', () => {
        this.selectedState = !this.selectedState;
        this.updateDie();
        });
    };
    
    return {
      getSelectedState:  () => {
        return self.selectedState;
      },

      setDie: (die) => {
        self.currentDie = die;
        self.draw();
      }

    }
  }
 
  draw(){
    this.updateDie();
  }

 updateDie(){
    this.resetDie();

    var visibleDots = this.diceDots[this.currentDie];
   
    for(var i=0; i< visibleDots.length; i++) {
   
      var dot = this.element.querySelectorAll(`[data-id="${visibleDots[i]}"]`)[0];
   
      dot.classList.add('colored');
    }
}
  
  resetDie(){
    this.resetSelected();
    
    this.element.querySelectorAll("div").forEach(x => x.classList.remove('colored'));
  }
 
   resetSelected(){
    if (this.element.classList.contains('selected')) {
      this.element.classList.remove('selected');
    }
   }

   dieSelected(){
     if(document.querySelectorAll('.selected').length < 4){
      this.element.classList.add('selected');
     }
   }
}

class YahtzeeGame{

    constructor(options){
     
      this.dices = {
          die1: new Die(`${options.container} #dice_1`),
          die2: new Die(`${options.container} #dice_2`),
          die3: new Die(`${options.container} #dice_3`),
          die4: new Die(`${options.container} #dice_4`),
          die5: new Die(`${options.container} #dice_5`),
          die6: new Die(`${options.container} #dice_6`),
      }
      
      //this.dices["die1"]

      this.rollButton = document.querySelector(`${options.buttonId}`)
      this.rollButton.addEventListener('click', () => { this.rollDice() });
      
      // this.rollDice = this.rollDice.bind(this);
      // this.roundRoll = this.roundRoll.bind(this);

      return {
        Die1:  () => {
          return this.dice.die1;
        }, Die2:  () => {
          return this.dice.die2;
        }, Die3:  () => {
          return this.dice.die3;
        }, Die4:  () => {
          return this.dice.die4;
        }, Die5:  () => {
          return this.dice.die5;
        }, Die6:  () => {
          return this.dice.die6;
        },
        // rollDice: this.rollDice,
        // roundRoll: this.roundRoll
    }
  }
  
  roundRoll () {
    var randomNumbersHolder = [0,0,0,0,0,0];
   
    for(var i=0; i< randomNumbersHolder.length; i++) {
      randomNumbersHolder[i]=(Math.floor(Math.random()* 6)+1);
    }
    
    return randomNumbersHolder;
  }
   
  rollDice() {
    var diceNumber= this.roundRoll();
   
    diceNumber.forEach((number,index) => {
      
     this.dices[`die${index+1}`].setDie(diceNumber[index])
    })
  }
}


 class ScoreBoard{
 
  constructor(){
    this.game = {
      round: 1,
      count: 3,
      dice: [],
      hold: [],
      temp_scorecard: {},
  }
   this.temp_scorecard= {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      bonus: 0,
      threekind: 0,
      fourkind: 0,
      fullhouse: 0,
      smallstraight: 0,
      largestraight: 0,
      yahtzee: 0,
      chance: 0,
   }

   return{
      setOnes: (score) =>{
         this.temp_scorecard.one = score;
      },
      setTwos: (score) =>{
        this.temp_scorecard.two = score;
      },
      setThrees: (score) =>{
        this.temp_scorecard.three = score;
      },
      setFours: (score) =>{
        this.temp_scorecard.four = score;
      },
      setFives: (score) =>{
        this.temp_scorecard.five = score;
      },
      setSixes: (score) =>{
        this.temp_scorecard.six = score;
      },
     
      uppertotal : ()=> {
        return this.temp_scorecard.one + this.temp_scorecard.two + this.temp_scorecard.three 
        + this.temp_scorecard.four + this.temp_scorecard.five + this.temp_scorecard.six + this.temp_scorecard.bonus;
      },
      setThreekind: (score)=> {
        this.temp_scorecard.threekind = score;
      },
      setFourkind:(score)=> {
        this.temp_scorecard.fourkind = score;
      },
      setFullhouse: (score)=> {
        this.temp_scorecard.fullhouse = score;
      },
      setSmallstraight: (score)=> {
        this.temp_scorecard.smallstraight = score;
      },
      setLargestraight:(score)=> {
        this.temp_scorecard.largestraight = score;
      },
      setYahtzee: (score)=> {
        this.temp_scorecard.yahtzee = score;
      },
      setChance: ()=> {
        this.temp_scorecard.chance = score;
      },
      
      lowertotal : ()=> {
      return this.threekind + this.fourkind + this.fullhouse + this.smallstraight + this.largestraight + this.yahtzee + this.chance;
      },

      combinedtotal: ()=> {
      return this.uppertotal() + this.lowertotal();
     }
   }
 }
  
 newRound() {
   game.count = 3;
   game.hold = [];
   game.dice = [];
 }

 getPossibilities() {
  var currentPossible = game.dice.concat(game.hold);
 
  var sortedDice = currentPossible.sort(function(a, b) {
    return a - b;
  });

  sortedDice.map(function(number) {
    var category;
    if (number === 1) {
      category = "one";
    } else if (number === 2) {
      category = "two";
    } else if (number === 3) {
      category = "three";
    } else if (number === 4) {
      category = "four";
    } else if (number === 5) {
      category = "five";
    } else if (number === 6) {
      category = "six";
    }
    game.temp_scorecard[category] += number;
    game.temp_scorecard.chance += number;
  });

   if (lg_straight) {
    game.temp_scorecard.largestraight = 40;
    game.temp_scorecard.smallstraight = 30;
   } else if (sm_straight) {
    game.temp_scorecard.smallstraight = 30;
  }

  if (threeOrMore !== null) {
    sortedDice.map(function(num) {
      if (threeOrMore.join("").length === 5) {
        game.temp_scorecard.fourkind += num;
        game.temp_scorecard.threekind += num;
        game.temp_scorecard.yahtzee = 50;
      } else if (threeOrMore.join("").length === 4) {
        game.temp_scorecard.fourkind += num;
        game.temp_scorecard.threekind += num;
      } else {
        game.temp_scorecard.threekind += num;
      }
    });
  }
 }
 
  resetTempScorecard() {
     this.temp_scorecard = {
     one: 0,
     two: 0,
     three: 0,
     four: 0,
     five: 0,
     six: 0,
     threekind: 0,
     fourkind: 0,
     fullhouse: 0,
     smallstraight: 0,
     largestraight: 0,
     yahtzee: 0,
     chance: 0
    }
  }
}


   