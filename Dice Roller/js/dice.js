const yahtzee_dice = document.querySelectorAll('.yahtzee_die');

class Die {
  
  constructor(selector){
    var self = this; 
   
    this._selector = selector;
   
    this.element = document.querySelector(_selector);

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
    });

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
   this.resetDie();
   this.updateDie();
 }

  resetDie(){
    this.currentDie = 0;

    this.selectedState = false;

    var coloredDots = diceDots[this.currentDie];

     for( i=0; i< coloredDots.length; i++ )
     {
      var dot = element.querySelectorAll(`[data-id="${coloredDots[i]}"]`)[0];
      
      coloredDots[i].classList.remove('colored');
     }
  }

  updateDie(){
    var visibleDots = diceDots[this.currentDie];
   
    for(var i=0; i< visibleDots.length; i++) {
   
      var dot = element.querySelectorAll(`[data-id="${visibleDots[i]}"]`)[0];
   
      dot.classList.add('colored');
   }
  }
 
  selectDie(){
    if (element.classList.contains('clicked')) {
      element.classList.remove('clicked');
        } else if(document.querySelectorAll('.clicked').length < 4)
        element.classList.add('clicked')
   }
}



class YahtzeeGame{

    constructor(){
     
      this.dice = {
          die1: new Die("#die_1"),
          die2: new Die("#die_2"),
          die3: new Die("#die_3"),
          die4: new Die("#die_4"),
          die5: new Die("#die_5"),
          die6: new Die("#die_6"),
      }
      
      this.game = {
        round: 1,
        count: 3,
        dice: [],
        hold: [],
        rolled: [],
        temp_scorecard: {},
    }
      this.scorecard= {
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

      setOnes: (score) =>{
         this.game.one = score;
      },
      setTwos: (score) =>{
        this.game.two = score;
      },
      setThrees: (score) =>{
        this.game.three = score;
      },
      setFours: (score) =>{
        this.game.four = score;
      },
      setFives: (score) =>{
        this.game.five = score;
      },
      setSixes: (score) =>{
        this.game.six = score;
      },
     
      uppertotal : ()=> {
        return this.game.one + this.game.two + this.game.three 
        + this.game.four + this.game.five + this.game.six + this.game.bonus;
      },
      setThreekind: (score)=> {
        this.game.threekind = score;
      },
      setFourkind:(score)=> {
        this.game.fourkind = score;
      },
      setFullhouse: (score)=> {
        this.game.fullhouse = score;
      },
      setSmallstraight: (score)=> {
        this.game.smallstraight = score;
      },
      setLargestraight:(score)=> {
        this.game.largestraight = score;
      },
      setYahtzee: (score)=> {
        this.game.yahtzee = score;
      },
      setChance: ()=> {
        this.game.chance = score;
      },
      
      lowertotal : ()=> {
      return this.threekind + this.fourkind + this.fullhouse + this.smallstraight + this.largestraight + this.yahtzee + this.chance;
      },

      combinedtotal: ()=> {
      return this.uppertotal() + this.lowertotal();
     }
    }
  }
   
 
  resetTempScorecard() {
    game.temp_scorecard = {
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
  
  
  let controller = new YahtzeeGame();
  

   