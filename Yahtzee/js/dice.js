
class Die {

  constructor(selector) {
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
      resetSelected: () => this.resetSelected()
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
    } else if (document.querySelectorAll('.selected').length < 5) {
      this.element.classList.add('selected');
    }
  }

  checkSelection() {
    if (this.element.classList.contains('selected')) {
      return true;
    } else return false;
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

    this.scoreBoard = new ScoreBoard();

    this.rollButton = document.querySelector(`${options.buttonId}`);
    this.rollButton.addEventListener('click', () => {
      if (this.scoreBoard.pointSelected() == true || this.scoreBoard.gameCount() > 0) {
        this.rollDice();
      }
    });

    this.restartButton = document.querySelector("#newGameButton");
    this.restartButton.addEventListener('click', () => {
      window.location.reload(true);
    });
  }

  roundRoll() {
    var randomNumbersHolder = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < randomNumbersHolder.length; i++) {
      randomNumbersHolder[i] = (Math.floor(Math.random() * 6) + 1);
    }

    return randomNumbersHolder;
  }

  rollDice() {
    if(this.scoreBoard.gameOver()==false){
      this.scoreBoard.resetTempScorecard();

      if (this.scoreBoard.pointSelected() == true) {
        this.scoreBoard.newRound(this.dices);
      }

      var diceNumber = this.roundRoll();

      diceNumber.forEach((number, index) => {
        if (this.dices[`die${index + 1}`].checkSelection()) {
          diceNumber[index] = this.oldDiceHolder[index];
        } else {
          this.dices[`die${index + 1}`].setDie(number);
        }
      })

      this.scoreBoard.setArray(diceNumber);
      this.scoreBoard.displayPossibilities();

      this.oldDiceHolder = diceNumber.slice();
    }
  }
}

class ScoreBoard {

  constructor() {
    this.game = {
      round: 1,
      count: 3,
      dice: [],

      temp_scorecard: {
        ones: { suggested: 0, selected: false },
        twos: { suggested: 0, selected: false },
        threes: { suggested: 0, selected: false },
        fours: { suggested: 0, selected: false },
        fives: { suggested: 0, selected: false },
        sixes: { suggested: 0, selected: false },
        chance: { suggested: 0, selected: false },
        smallstraight: { suggested: 0, selected: false },
        largestraight: { suggested: 0, selected: false },
        threekind: { suggested: 0, selected: false },
        fourkind: { suggested: 0, selected: false },
        fullhouse: { suggested: 0, selected: false },
        yahtzee: { suggested: 0, selected: false },
      },

      scorecard: {
        ones: { saved: 0 },
        twos: { saved: 0 },
        threes: { saved: 0 },
        fours: { saved: 0 },
        fives: { saved: 0 },
        sixes: { saved: 0 },
        chance: { saved: 0 },
        smallstraight: { saved: 0 },
        largestraight: { saved: 0 },
        bonus: { saved: 0 },
        threekind: { saved: 0 },
        fourkind: { saved: 0 },
        fullhouse: { saved: 0 },
        yahtzee: { saved: 0 },
      },

      lefttotalSum: 0,

      totalSum: 0,

      everyRowSelected: false,
    }

    this.gameOver = false;
    
    this.pointSelected = false;

    this.mapper = { 1: 'ones', 2: 'twos', 3: 'threes', 4: 'fours', 5: 'fives', 6: 'sixes' };

    this.specialScore = { 1: 'chance', 2: 'smallstraight', 3: 'largestraight', 4: 'threekind', 5: 'fourkind', 6: 'fullhouse', 7: 'yahtzee', 8: 'chance' };

    this.table = document.querySelectorAll("#score_container .score_value");

    this.table.forEach(el => {
      el.addEventListener('click', (e) => {
        if (this.pointSelected == false) {
          this.fixPoint(el.getAttribute('data-id'));
        }
      });
    })

    return {
      setArray: (diceArray) => {
        return this.game.dice = diceArray;
      },

      pointSelected: () => {
        return this.pointSelected;
      },
     
      gameOver: () => {
        return this.gameOver;
      },
      gameCount: () => {
        return this.game.count;
      },
      gameDice: () => {
        return this.game.dice;
      },

      setPoints: (category, score) => {
        this.temp_scorecard[category] = score;
      },

      displayPossibilities: () => this.displayPossibilities(),

      updateScoreCell: () => this.updateScoreCell(),

      getPossibilities: () => this.getPossibilities(),

      newRound: (dices) => this.newRound(dices),

      resetTempScorecard: () => this.resetTempScorecard(),
    }
  }

  newRound(dices) {
    this.game.round++;
    this.game.count = 3;
    this.pointSelected = false;

    Object.values(dices).forEach((key) => {
      key.resetSelected();
    });
  }

  fixPoint(pointsName) {
    this.pointSelected = true;

    this.game.temp_scorecard[pointsName].selected = true;

    this.game.scorecard[pointsName].saved = this.game.temp_scorecard[pointsName].suggested;
    document.getElementById(`${pointsName}_score`).classList.add("fixedHighlight");
  }

  getPossibilities() {
    var currentPossible = []
    currentPossible = this.game.dice;

    this.game.temp_scorecard.chance.suggested = 0;

    currentPossible.forEach((number) => {
      this.game.temp_scorecard[this.mapper[number]].suggested += number;

      this.game.temp_scorecard.chance.suggested += number;
    });

    this.calculateSmallStraight();
    this.calculateLargeStraight();
    this.calculateThreeofakindOrMore();
    this.calculateBonus();
  }

  calculateThreeofakindOrMore() {
    let isYahtzee = false, 
        hasThreeOfAKind = false, 
        hasFourOfAKind = false, 
        hasPair = false;

    let threeOfAKindPoints = 0, 
        fourOfAKindPoints = 0;

    for (let i = 1; i < 7; i++) {
      var score = this.game.temp_scorecard[this.mapper[i]].suggested;

      switch (this.mapper[i]) {
        case 'ones':
          if (score == 6) {
            isYahtzee = true;
          } else if (score == 4) {
            hasFourOfAKind = true;
            fourOfAKindPoints = 4;

            hasThreeOfAKind = true;
            threeOfAKindPoints = 3;
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

            hasThreeOfAKind = true;
            threeOfAKindPoints = 6;
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

            hasThreeOfAKind = true;
            threeOfAKindPoints = 9;
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

            hasThreeOfAKind = true;
            threeOfAKindPoints = 12;
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

            hasThreeOfAKind = true;
            threeOfAKindPoints = 15;
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

            hasThreeOfAKind = true;
            threeOfAKindPoints = 18;
          } else if (score == 18) {
            hasThreeOfAKind = true;
            threeOfAKindPoints = score;
          } else if (score == 12) {
            hasPair = true;
          }
          break;
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
    var isLargeStraight = 0;

    for (let i = 1; i < 7; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested > 0) {
        isLargeStraight++;
      }
    }

    if (isLargeStraight == 6) {
      this.game.temp_scorecard.largestraight.suggested = 40;
    }
  }

  calculateSmallStraight() {
    let smallStraightFirstType = 0, smallStraightSecondType = 0;

    for (let i = 1; i < 6; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested > 0) {
        smallStraightFirstType++;
      }
    }

    for (let i = 2; i < 7; i++) {
      if (this.game.temp_scorecard[this.mapper[i]].suggested > 0) {
        smallStraightSecondType++;
      }
    }

    if (smallStraightFirstType == 5 || smallStraightSecondType == 5) {
      this.game.temp_scorecard.smallstraight.suggested = 30;
    }
  }

  calculateBonus() {
    if (this.lefttotal() > 63) {
      this.game.scorecard.bonus.saved = 35;
    }
  }

  lefttotal() {
    let sum = 0;
    Object.values(this.mapper).forEach((key) => {
      sum += this.game.scorecard[key].saved;
    });

    return sum;
  }

  rightTotal() {
    let sum = 0;
    Object.values(this.game.scorecard).forEach((key) => {
      sum += key.saved;
    });

    return sum;
  }

  combinedtotal() {
    return this.lefttotal() + this.rightTotal();
  }

  leftTotalSelected() {
    let singleCombinations = this.game.temp_scorecard;

    let count = 0;

    Object.values(this.mapper).forEach(key => {
      if (singleCombinations[key].selected == true) count++;
    });

    if (count == 6) {
      return true;
    }

    return false;
  }

  everyRowSelected() {
    let count = 0;

    Object.values(this.game.temp_scorecard).forEach(key => {
      if (key.selected == true) count++;
    });

    if (count == 13) {
      return true;
    }

    return false;
  }

  updateScoreCell(updateScore) {
    let scoreContainer = document.getElementById(`${updateScore}_score`);
    let scoreValue = this.game.temp_scorecard[updateScore].suggested;

    if (this.game.temp_scorecard[updateScore].selected == false) {
      if (scoreValue > 0) {
        scoreContainer.classList.add("highlight");
      } else scoreContainer.classList.remove("highlight");

      scoreContainer.querySelector('.score_value').innerHTML = scoreValue;
    }
  }

  displayPossibilities() {
    this.game.count--;

    this.getPossibilities();

    if (this.leftTotalSelected()) {
      this.game.lefttotalSum = this.lefttotal();

      document.getElementById("sum_score").querySelector('.sum_value').innerHTML = this.game.lefttotalSum;
    }

    if (this.everyRowSelected()) {
      this.game.totalSum = this.rightTotal();

      document.getElementById("total_score").querySelector('.total_value').innerHTML = this.game.totalSum;

      this.ovegameOver = true;

      document.getElementById("notice").innerHTML = "Good Job Champ";
    }

    document.getElementById("round_score").querySelector('.round_value').innerHTML = this.game.round;
    document.getElementById("count_score").querySelector('.count_value').innerHTML = this.game.count;

    Object.keys(this.game.temp_scorecard).map((key) => {
      this.updateScoreCell(key);
    });
  }

  resetTempScorecard() {
    Object.keys(this.game.temp_scorecard).map((key) => {
      this.game.temp_scorecard[key].suggested = 0;
    });
  }
}



