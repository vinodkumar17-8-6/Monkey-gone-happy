var PLAY = 1;

var END = 0;

var gameState = PLAY;

var monkey , monkey_running;

var banana ,banana1Image, obstacle, obstacleImage;

var bananaGroup, obstaclesGroup;

var score;

var bananaEaten;

var jungle,jungleImage;

var invisible;

var background;

var jumpSound,shoutSound;

var reset;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana1Image = loadImage("banana1.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage = loadImage("jungle.png");
  
  resetImage = loadImage("reset.png");
  
  jumpSound = loadSound("jump.mp3");

  shoutSound = loadSound("shout.mp3");
  
  caughtSound = loadSound("caught.mp3")
}

function setup() {
  
  createCanvas(600,400)
 
  background = createSprite(300,150);
  background.addImage(jungleImage);
  background.scale = 2;
  background.x = background.width / 1;
     
  monkey = createSprite(100,200);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  
  invisible = createSprite(300,370,600,10);
  invisible.visible = false;
  
  reset = createSprite(300,200);
  reset.addImage(resetImage);
  reset.scale = 0.1;
  
  obstaclesGroup = createGroup();
  
  bananaGroup = createGroup();
  
  score = 0;
  
  bananaEaten = 0;
  
}


function draw() {
  
if(gameState === PLAY){

      reset.visible = false;
       
      background.velocityX = -4;
     if (background.x < 0 ){
        background.x = background.width / 2;
      }

      if(keyDown("space") & monkey.y >= 300 ){
        monkey.velocityY = -20;
        jumpSound.play();
      }

      spawnObstacles();
      spawnFood();

     if (frameCount % 30 === 0){
        score = score+1
      }

      if (bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
        bananaEaten = bananaEaten + 1;
      }

      if (obstaclesGroup.isTouching(monkey)){
        caughtSound.play();
        obstaclesGroup.destroyEach();
        bananaGroup.destroyEach();
        shoutSound.play();
        gameState = END;
      }

}

  
else if (gameState === END){
 
    reset.visible = true;
  
    background.velocityX = 0;
    
    monkey.visible = false;
  
    if (mousePressedOver(reset)){
      restart();
    }
    
}
 
   
  monkey.velocityY = monkey.velocityY + 1;

  monkey.collide(invisible);

  drawSprites();
  
 
  
  textSize(30);
  strokeWeight(30);
  fill("whiote");
  text("Survival Time in sec : " + score ,150,30);
  textSize(30);
  text("Bananas Eaten : "+ bananaEaten,190,60);
  
}

function restart (){
  
  gameState = PLAY;
  
  reset.visible = false;
  
  monkey.visible = true;
  
  score = 0;
  
  bananaEaten = 0;
  
}

function spawnObstacles(){
  
  if (frameCount % 100 === 0){
    
   var obstacles,obstaclesImage;
   obstacles = createSprite(650,330);
   obstacles.addImage(obstacleImage);
   obstacles.scale = 0.2;
   obstacles.velocityX = -(10 + score / 2);
   
   obstaclesGroup.add(obstacles);
    
   obstacles.lifetime = 65;
    
  }
  
}

function spawnFood(){
  
  if (frameCount % 70 === 0){
    
   var banana,bananaImage;
   banana = createSprite(650,Math.round(random(150,200)));
   banana.addImage(banana1Image)
   banana.scale = 0.1;
   banana.velocityX = -(12 + score / 2);
    
   bananaGroup.add(banana);
    
   banana.lifetime = 55;
    
  }
  
}







