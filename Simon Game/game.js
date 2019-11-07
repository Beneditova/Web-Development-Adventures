class SimonGame{
  constructor(){
    this.buttonColours = ["red", "blue", "green", "yellow"];
    
    this.gamePattern = [];

    this.userClickedPattern = [];
   
    $(".btn").click((function(){
       let self = this
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
}




