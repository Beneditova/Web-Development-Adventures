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

    window.onload = () => {
      this.element.addEventListener('click', () => {
        this.selectedState = !this.selectedState;
        this.updateDie();
      });
    };

    return {
      getSelectedState: () => {
        return self.selectedState;
      },

      setDie: (die) => {
        self.currentDie = die;
        self.draw();
      }
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
    this.resetSelected();

    this.element.querySelectorAll(" div").forEach(x => x.classList.remove('colored'));
  }

  resetSelected() {
    if (this.element.classList.contains('selected')) {
      this.element.classList.remove('selected');
    }
  }

  dieSelected() {
    if (document.querySelectorAll('.selected').length < 4) {
      this.element.classList.add('selected');
    }
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



    this.rollButton = document.querySelector(`${options.buttonId}`)
    this.rollButton.addEventListener('click', () => { this.rollDice(); });

    // this.rollDice = this.rollDice.bind(this);
    // this.roundRoll = this.roundRoll.bind(this);

    return {
      Die1: () => {
        return this.dice.die1;
      }, Die2: () => {
        return this.dice.die2;
      }, Die3: () => {
        return this.dice.die3;
      }, Die4: () => {
        return this.dice.die4;
      }, Die5: () => {
        return this.dice.die5;
      }, Die6: () => {
        return this.dice.die6;
      },
      // rollDice: this.rollDice,
      // roundRoll: this.roundRoll
    }
  }

  roundRoll() {
    var randomNumbersHolder = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < randomNumbersHolder.length; i++) {
      randomNumbersHolder[i] = (Math.floor(Math.random() * 6) + 1);
    }

    return randomNumbersHolder;
  }

  rollDice() {
    var diceNumber = this.roundRoll();

    var scoreBoard = new ScoreBoard();
    scoreBoard.setArray(diceNumber);

    console.log(scoreBoard.gameDice);

    scoreBoard.displayPossibilities();

    diceNumber.forEach((number, index) => {
      this.dices[`die${index + 1}`].setDie(diceNumber[index])
    })
  }
}

class ScoreBoard {

  constructor() {
    this.game = {
      round: 1,
      count: 3,
      hold: [],
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

    return {
      setArray: (diceArray) => {
        return this.game.dice = diceArray;
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

      getPossibilities: () => this.getPossibilities()
    }
  }

  newRound() {
    game.count = 3;
    game.hold = [];
    game.dice = [];
  }

  getPossibilities() {
    var currentPossible = this.game.dice;

    currentPossible.forEach((number) => {
      this.game.temp_scorecard[this.mapper[number]].suggested += number;

      this.game.temp_scorecard.chance.suggested += number;
    });
    /*
     var smallStraightRegex = /(\d)?((1(\d)?2(\d)?3(\d)?4(\d)?5)|(2(\d)?3(\d)?4(\d)?5(\d)?6))(\d)?/g;
     var largeStraightRegex = /(123456)/g;
     
     var threeOrMore = currentPossible.join('').match(/(\d)\1{2,}/g);
    
     var smallStraight = smallStraightRegex.test(currentPossible.join(""));
     var largeStraight = largeStraightRegex.test(currentPossible.join(""));
     
     if (largeStraight) {
       this.game.temp_scorecard.largestraight = 40;
       this.game.temp_scorecard.smallstraight = 30;
     } else if (smallStraight) {
       this.game.temp_scorecard.smallstraight = 30;
     }
       
     if (threeOrMore !== null) {
       sortedDice.map(function (num) {
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
 
     var fullhouse = currentPossible.join('').match(/(\d)\1{2,}(\d)\2{1,}/g);
     if (fullhouse === null) {
       fullhouse = currentPossible.join('').match(/(\d)\1{1,}(\d)\2{2,}/g);
     }
     if (fullhouse) {
       game.temp_scorecard.fullhouse = 25;
     }
     */



  }


  calcFullHouse() {
    let three = false, two = false;

    for (let i = 1; i < 7; i++) {
      if (this.results[i] * i >= i * 3) {
        three = i;
      }
    }

    for (let i = 1; i < 7; i++) {
      if (this.results[i] * i >= i * 2 && i != three) {
        two = i;
      }
    }
  }
 
  calcYahtzee() {
    let isYahtzee = false;
    var score = 0;

    for (let i = 0; i < this.mapper.length; i++) {
      var j =1;
      switch (this.mapper[j]) {
        case 1:
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 6) {
            isYahtzee = true;
            score = 6;
          }
          break;
        case 2:
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 12) {
            isYahtzee = true;
            score = 12;
          }
          break;
        case 3:
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 18) {
            isYahtzee = true;
            score = 18;
          }
          break;
        case 4:
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 24) {
            isYahtzee = true;
            score = 24;
          }
          break;
        case 5:
          if (this.game.temp_scorecard[this.mapper[i]].suggested == 30) {
            isYahtzee = true;
            score = 30;
          }
          break;
        default:
      }
      j++;
    }
    
    if(isYahtzee){
      this.game.temp_scorecard.yahtzee = 50;
    }
   
  }
  
  largeStraight(){
    var isLargeStraight = false;
    for(let i = 0; i < this.mapper.length; i++) {
       if(this.game.temp_scorecard[this.mapper[i]].suggested >0){
        isLargeStraight=true;
       } else isLargeStraight=false;
    }
    if(isLargeStraight){
      this.game.temp_scorecard.largestraight = 40;
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



