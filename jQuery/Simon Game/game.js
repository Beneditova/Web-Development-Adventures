class SimonGame {
  constructor() {
    var self = this;

    this.buttonColours = ["red", "blue", "green", "yellow"];

    this.gamePattern = [];

    this.userClickedPattern = [];
    
    this.started = false; 
    
    this.level = 0;
    
    $(document).keypress(function() {
      if (!self.started) {
        $("#level-title").text("Level " + self.level);
        self.nextSequence();
        self.started = true;
      }
    });

    $(".btn").click((function () {
    
      var userChosenColour = $(this).attr("id");

      self.userClickedPattern.push(userChosenColour);

      self.playSound(userChosenColour);
      self.animatePress(userChosenColour);
      self.checkAnswer(self.userClickedPattern.length-1);
     }));
  }

  nextSequence() {
    this.userClickedPattern = [];

    this.level++;
    $("#level-title").text("Level " + this.level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = this.buttonColours[randomNumber];
    this.gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    this.playSound(randomChosenColour);
  }

  playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
 
  checkAnswer(currentLevel) {
   if (this.gamePattern[currentLevel] === this.userClickedPattern[currentLevel]) {

    console.log("success");
     if (this.userClickedPattern.length === this.gamePattern.length){
        setTimeout( () => {
        this.nextSequence();
      }, 1000);

    }
   } else {
     console.log("wrong");
     $("#level-title").text("You Have Failed Try Again!");
    }
  }
}


