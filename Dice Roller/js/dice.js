const yahtzee_dice = document.querySelectorAll('.yahtzee_die');

class Die {

  constructor(selector) {
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

   
      this.element.addEventListener('click', () => {
        this.selectedState = !this.selectedState;
        this.dieSelected();
      });
    

    return {
      getSelectedState: () => {
        return self.selectedState;
      },

      setDie: (die) => {
        this.currentDie = die;
         this.draw();
      },
      
      checkSelection: () => this.checkSelection(),
     }
  }

  draw() {
    this.updateDie();
  }

  updateDie() {
    this.resetDie();

    var visibleDots = this.diceDots[this.currentDie];

    for (var i = 0; i < visibleDots.length; i++) {

      var dot = this.element.querySelectorAll(`[data-id="${visibleDots[i]}"]`)[0];

      dot.classList.add('colored');
    }
  }

  resetDie() {
   // this.resetSelected();

    this.element.querySelectorAll(" div").forEach(x => x.classList.remove('colored'));
  }

 
  resetSelected() {
    if (this.element.classList.contains('selected')) {
      this.element.classList.remove('selected');
    }
  }

  dieSelected() {
    if (this.element.classList.contains('selected')) {
      this.element.classList.remove('selected');
    }else if (document.querySelectorAll('.selected').length < 5) {
      this.element.classList.add('selected');
    }
  }

  checkSelection(){
    if (this.element.classList.contains('selected')) {
      return true;
    }else return false;
  }
}

class YahtzeeGame {

  constructor(options) {

    this.dices = {
      die1: new Die(`${options.container} #dice_1`),
      die2: new Die(`${options.container} #dice_2`),
      die3: new Die(`${options.container} #dice_3`),
      die4: new Die(`${options.container} #dice_4`),
      die5: new Die(`${options.container} #dice_5`),
      die6: new Die(`${options.container} #dice_6`),
    }

     this.oldDiceHolder = []

    this.rollButton = document.querySelector(`${options.buttonId}`)
    this.rollButton.addEventListener('click', () => { this.rollDice(); });

    // this.rollDice = this.rollDice.bind(this);
    // this.roundRoll = this.roundRoll.bind(this);

    
      // rollDice: this.rollDice,
      // roundRoll: this.roundRoll
    
  }

  roundRoll() {
    var randomNumbersHolder = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < randomNumbersHolder.length; i++) {
      randomNumbersHolder[i] = (Math.floor(Math.random() * 6) + 1);
    }
    console.log(randomNumbersHolder);
    return randomNumbersHolder;
  }
   
  rollDice() {
    
    var diceNumber = this.roundRoll();

    diceNumber.forEach((number, index) => {
      if(this.dices[`die${index + 1}`].checkSelection()){
        diceNumber[index] = this.oldDiceHolder[index];
      } else{
         this.dices[`die${index + 1}`].setDie(number);
      } 
    })
   
    Object.values(this.dices).forEach(die =>{
      console.log(die);
    })
   
    var scoreBoard = new ScoreBoard();
    scoreBoard.setArray(diceNumber);
    scoreBoard.resetTempScorecard();

    console.log(scoreBoard.gameDice);

    scoreBoard.displayPossibilities();
    
    this.oldDiceHolder = diceNumber.slice();
  }
}

class ScoreBoard {

  constructor() {
    this.game = {
      round: 1,
      count: 3,
     
      dice: [],
      temp_scorecard: {
        ones: { saved: 0, suggested: 0 },
        twos: { saved: 0, suggested: 0 },
        threes: { saved: 0, suggested: 0 },
        fours: { saved: 0, suggested: 0 },
        fives: { saved: 0, suggested: 0 },
        sixes: { saved: 0, suggested: 0 },
        chance: { saved: 0, suggested: 0 },
        smallstraight: { saved: 0, suggested: 0 },
        largestraight: { saved: 0, suggested: 0 },
        bonus: { saved: 0, suggested: 0 },
        threekind: { saved: 0, suggested: 0 },
        fourkind: { saved: 0, suggested: 0 },
        fullhouse: { saved: 0, suggested: 0 },
        yahtzee: { saved: 0, suggested: 0 },
      }
    }

    
    this.mapper = { 1: 'ones', 2: 'twos', 3: 'threes', 4: 'fours', 5: 'fives', 6: 'sixes' }

     this.table = document.querySelectorAll("#score_container .score_value");
     this.table.forEach(el => {
      el.addEventListener('click', (e) => {
       // console.log("hallo");
        console.log({x: e});
        
        var parent = el.parentElement.nodeName;
        console.log(el.getAttribute('data-id'));

        this.fixPoints(el.getAttribute('data-id'));
      });
     })
    
   
   return {
      setArray: (diceArray) => {
        return this.game.dice = diceArray;
      },

      gameDice: () => {
        return this.game.dice;
      },

      setPoints: (category, score) => {
        this.temp_scorecard[category] = score;
      },

      uppertotal: () => {
        return this.temp_scorecard.one + this.temp_scorecard.two + this.temp_scorecard.three
          + this.temp_scorecard.four + this.temp_scorecard.five + this.temp_scorecard.six + this.temp_scorecard.bonus;
      },

      lowertotal: () => {
        return this.threekind + this.fourkind + this.fullhouse + this.smallstraight + this.largestraight + this.yahtzee + this.chance;
      },

      combinedtotal: () => {
        return this.uppertotal() + this.lowertotal();
      },

      displayPossibilities: () => this.displayPossibilities(),

      updateScoreCell: () => this.updateScoreCell(),

      getPossibilities: () => this.getPossibilities(),
      
      resetTempScorecard: () => this.resetTempScorecard()
    }
  }

  newRound() {
    game.count = 3;
    game.dice = [];
  }
  
  fixPoints(pointsName){
   // this.game.temp_scorecard[pointsName].saved = this.game.temp_scorecard[pointsName].suggested ;
    document.getElementById(`${pointsName}_score`).classList.add("fixedHighlight");
  }

  getPossibilities() {
  var currentPossible = []
  currentPossible=this.game.dice;
  

    currentPossible.forEach((number) => {
      this.game.temp_scorecard[this.mapper[number]].suggested += number;

      this.game.temp_scorecard.chance.suggested += number;
    });

    this.calculateSmallStraight();
    this.calculateLargeStraight();
    this.calculateThreeofakindOrMore();
  }

  calculateThreeofakindOrMore() {
    let isYahtzee = false, hasThreeOfAKind = false, hasFourOfAKind = false, hasPair = false;

    let threeOfAKindPoints = 0, fourOfAKindPoints = 0;

    for (let i = 1; i < 7; i++) {
      var score = this.game.temp_scorecard[this.mapper[i]].suggested;
     
      switch (this.mapper[i]) {
        case 'ones':
          if (score == 6) {
            isYahtzee = true;
          } else if (score == 4) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 4;
          }
          else if (score == 3) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 2) {
            hasPair = true;
          }
          break;
        case 'twos':
          if (score == 12) {
            isYahtzee = true;
          } else if (score == 8) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 8;
          } else if (score == 6) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 4) {
            hasPair = true;
          }
          break;
        case 'threes':
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 18) {
            isYahtzee = true;
          } else if (score == 12) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 12;
          } else if (score == 9) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 6) {
            hasPair = true;
          }
          break;
        case 'fours':
          if (score == 24) {
            isYahtzee = true;
          } else if (score == 16) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 16;
          } else if (score == 12) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 8) {
            hasPair = true;
          }
          break;
        case 'fives':
          if (score == 30) {
            isYahtzee = true;
          } else if (score == 20) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 20;
          } else if (score == 15) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 10) {
            hasPair = true;
          }
          break;
        case 'sixes':
          if (score == 36) {
            isYahtzee = true;
          } else if (score == 24) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 24;
          } else if (score == 18) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 12) {
            hasPair = true;
          }
          break;
        default:
      }
    }

    if (isYahtzee) {
      this.game.temp_scorecard.yahtzee.suggested = 50;
    }
    if (hasFourOfAKind) {
      this.game.temp_scorecard.fourkind.suggested = fourOfAKindPoints;
    }
    if (hasThreeOfAKind) {
      this.game.temp_scorecard.threekind.suggested = threeOfAKindPoints;
    }
    if (hasThreeOfAKind && hasPair) {
      this.game.temp_scorecard.fullhouse.suggested = 25;
    }
  }

  calculateLargeStraight() {
    var isLargeStraight = false;
    for (let i = 1; i < 7; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested == 0) {
        isLargeStraight = false;
      } else isLargeStraight = true;
    }
   
    if (isLargeStraight) {
      this.game.temp_scorecard.largestraight.suggested = 40;
    }
  }

  calculateSmallStraight() {
    var smallStraightFirstType = false, smallStraightSecondType = false;
    
    for (let i = 1; i < this.mapper.length-1; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested > 0) {
        smallStraightFirstType = true;
      } else smallStraightFirstType = false;
    }
    
    for (let i = 2; i < this.mapper.length; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested > 0) {
        smallStraightSecondType = true;
      } else smallStraightSecondType = false;
    }

    if (smallStraightFirstType||smallStraightSecondType) {
      this.game.temp_scorecard.smallstraight.suggested = 30;
    }
  }




  updateScoreCell(updateScore) {
    let scoreContainer = document.getElementById(`${updateScore}_score`);
    let scoreValue = this.game.temp_scorecard[updateScore].suggested;

    if (scoreValue > 0) {
      scoreContainer.classList.add("highlight");
    } else scoreContainer.classList.remove("highlight");

    scoreContainer.querySelector('.score_value').innerHTML = scoreValue;
  }


  displayPossibilities() {
    this.getPossibilities();

    Object.keys(this.game.temp_scorecard).map((key) => {
      this.updateScoreCell(key);
    });
  }

  resetTempScorecard() {
    this.temp_scorecard = {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixs: 0,
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



