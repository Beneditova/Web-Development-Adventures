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

