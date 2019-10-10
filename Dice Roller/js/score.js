var game = {
    player: 1,
    round: 1,
    count: 3,
    dice: [],
    hold: [],
    rolled: [],
    temp_scorecard: {},
    scorecard: {
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
      bonus: null,
      uppertotal: function() {
        return this.one + this.two + this.three + this.four + this.five + this.six + this.bonus;
      },
      threekind: null,
      fourkind: null,
      fullhouse: null,
      smallstraight: null,
      largestraight: null,
      yahtzee: null,
      chance: null,
      lowertotal: function() {
        return this.threekind + this.fourkind + this.fullhouse + this.smallstraight + this.largestraight + this.yahtzee + this.chance;
      },
      combinedtotal: function() {
        return this.uppertotal() + this.lowertotal();
      }
    }
  };

  
  function resetTempScorecard() {
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
    };
  }

