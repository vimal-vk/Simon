var gamePattern = [];
var userClickedPattern = [];
var start = 0;
var level = 0;

$(document).keypress(function () {
  if (start == 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start=1;
  }
})
function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);
    
  var randomNumber = Math.floor(Math.random() * 4);

  var buttonColours = ["red", "blue", "green", "yellow"];

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
    
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
  playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)

})

function playSound(name) {
  var audio = new Audio("sounds/" + name  + ".mp3");
  audio.play()
}

function animatePress(currentColour) {
    currentColour = "#" + currentColour;
    $(currentColour).addClass("pressed");
    setTimeout(() => {
      $(currentColour).removeClass("pressed");
    }, 500);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){ 
    if ((gamePattern.length-1)==currentLevel) {
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
      }, 1000);
    }  
  }
  else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any key to Restart");
    start = 0;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }
  
}