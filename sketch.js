var player;
var ball;
var goal;
var song;
var button;
var shape;
var rectangle;
var volume;
var volume2;

var score = 0;
var lives = 5;

var gamestate = "serve" 

let sound = false;

let st = false

let playing = false

function preload() {
KeeperImg = loadImage("goalkeeper.png");
PlayerImg = loadImage("player1.png");
BallImg = loadImage("ball.png");
GoalImg = loadImage("post.png");
ButtonImg = loadImage("button.png");
GoalRushSound = loadSound("Goal_Rush.mp3");
VolumeImg = loadImage("volume_button.png")
Volume2Img = loadImage("volume_button_2.png")
}

function setup() {
  createCanvas(1462, 662);

  keeper = createSprite(725, 210);
  keeper.addImage("keeper", KeeperImg);

  player = createSprite(725, 500);
  player.addImage("player", PlayerImg);

  ball = createSprite(721, 620);
  ball.addImage("ball", BallImg);
  
  goal = createSprite(725, 200);
  goal.addImage("goal", GoalImg);

  button = createSprite(740, 615);
  button.addImage("button", ButtonImg);

  volume = createSprite(1140, 30);
  volume.addImage("volume", VolumeImg);

  volume2 = createSprite(1180, 30);
  volume2.addImage("volume2", Volume2Img);
  
  var rand = (random(1,1500));
  console.log(rand);

  shape = createSprite(725, 200, 300, 125)
  rectangle = createSprite(725, 210, 50, 200)
}

function draw() {
  keeper.scale = 0.5;
  player.scale = 0.45;
  ball.scale = 0.091;
  goal.scale = 1.15;
  button.scale = 0.2
  volume.scale = 0.2
  volume2.scale = 0.2
  
  keeper.depth = keeper.depth
  goal.depth = keeper.depth-1

  shape.visible = false;
  rectangle.visible = false;

  if (gamestate === "play" && sound === false) {
    sound = true
    GoalRushSound.loop()
    volume.visible = true
  }
  
  player.depth = player.depth
  ball.depth = player.depth-1
  background("skyblue");
  drawSprites();

  if (gamestate === "serve" && (keyWentUp("SPACE") || mousePressedOver(button))) {
    gamestate = "play"
    }
 
  if (gamestate === "serve") {
    textSize(50)
    fill("black")
    text("Press SPACE / PLAY to enjoy gaming! 😃🕹️", 240, 180)

    textSize(50)
    fill("black")
    text("Rules: ", 240, 250)

    textSize(50)
    fill("black")
    text("- Shoot the ball in the goal using the arrow keys.", 240, 310)

    textSize(50)
    fill("black")
    text("- Avoid the ball from being saved by the goalkeeper.", 240, 370)

    textSize(50)
    fill("black")
    text("- Press the left arrow key to shoot on the left. ", 240, 430)

    textSize(50)
    fill("black")
    text("- Press the right arrow key to shoot on the right. ", 240, 490)

    textSize(50)
    fill("black")
    text("- Press the up arrow key to shoot straight. ", 240, 550)

    keeper.visible = false
    player.visible = false
    ball.visible = false
    goal.visible = false
    button.visible = true
    volume.visible = false
    volume2.visible = false
  }
  
  if (gamestate === "play") {
    keeper.visible = true
    player.visible = true
    ball.visible  = true
    goal.visible = true
    button.visible = false
    volume2.visible = true

    textSize(40)
    fill("black")
    text("Score = "+score, 50, 50)
  
    textSize(40)
    fill("black")
    text("Lives = "+lives, 50, 110)
    
  }

  if (lives === 0) {
    gamestate = "end"
  }

 if (keyWentUp(UP_ARROW) && st === false) {
  ball.velocityY = -8
  ball.rotationSpeed = 30
  keeper.x = (random(600, 850))
  rectangle.x = keeper.x
  rectangle.y = keeper.y
  st = true
 }

 if (playing === false && gamestate === "play") {
  volume2.visible = false
  volume.visible = true
 }

 if (gamestate === "play" && mousePressedOver(volume) && playing === false) {
  GoalRushSound.pause()
  volume2.visible = true
  playing = true
  volume.visible = false
 }

 if (mousePressedOver(volume2) && playing === true) {
  playing = false
  GoalRushSound.play()
  volume2.visible = true
  volume.visible = false
 }

 if (keyWentUp(RIGHT_ARROW) && st === false) {
  ball.velocityY = -8 
  ball.velocityX = 3
  ball.rotationSpeed = 30
  keeper.x = (random(600, 850))
  rectangle.x = keeper.x
  rectangle.y = keeper.y
  st = true
 }

 if (keyWentUp(LEFT_ARROW) && st === false) {
  ball.velocityY = -8 
  ball.velocityX = -3
  ball.rotationSpeed = -30
  keeper.x = (random(600, 850))
  rectangle.x = keeper.x
  rectangle.y = keeper.y
  st = true
 }

 // ==================
 //  FIXED CODE BLOCK
 // ==================
 
 // Check for a SAVE first.
 if (ball.isTouching(rectangle)) {
  lives -= 1;
  st = false;

  // Reset ball
  ball.x = 721;
  ball.y = 620;
  ball.velocityX = 0;
  ball.velocityY = 0;
  ball.rotationSpeed = 0;
  
  // Reset keeper
  keeper.x = 725;
  rectangle.x = 725;
  rectangle.y = 210;
  keeper.y = 210;
 } 
 
 // If it wasn't a save, THEN check if it was a goal.
 else if (ball.isTouching(shape) && !ball.isTouching(rectangle)) {
  score += 1;
  st = false;

  // Reset ball
  ball.x = 721;
  ball.y = 620;
  ball.velocityX = 0;
  ball.velocityY = 0;
  ball.rotationSpeed = 0;

  // Reset keeper
  keeper.x = 725;
  rectangle.x = 725;
  rectangle.y = 210;
  keeper.y = 210;
 }
 // ==================
 //  END OF FIX
 // ==================


 if (lives <= 0) {
  gamestate = "end"
  background("khaki")
    keeper.visible = false
    player.visible = false
    ball.visible = false
    goal.visible = false
    button.visible = false
    GoalRushSound.stop()

    textSize(50)
    fill("black")
    text("GAME OVER!", 580, 331)
 }

}