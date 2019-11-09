class SimonGame {
  constructor() {
    this.buttonColours = ["red", "blue", "green", "yellow"];

    this.gamePattern = [];

    this.userClickedPattern = [];

    self = this;
    $(".btn").click((function () {
    
      var userChosenColour = $(this).attr("id");

      self.userClickedPattern.push(userChosenColour);

      console.log("userClickedPattern");
    }));
  }

  nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = this.buttonColours[randomNumber];

    this.gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
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
}




