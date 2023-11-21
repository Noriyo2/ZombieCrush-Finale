var bg, bgImg
var car,upImg,rightImg,leftImg,downImg
var zombieImg
var edges
var zombieGroup
var crushZombie
var score
var heart1,heart2,heart3,heartImg
var lives
var gameOverImg
var powerUpGroup

function preload(){
  bgImg= loadImage("background.jpg")
  zombieImg = loadImage("zombie.png")
  upImg = loadImage("car.png")
  downImg = loadImage("down.png")
  rightImg = loadImage("Right.png")
  leftImg = loadImage("left.png")
  crushZombie = loadImage("Crushed.png")
  //preload the heartImg
  heartImg = loadImage("Heart.png")
  gameOverImg = loadImage("GAMEOVER.png")
  
}



function setup(){

  createCanvas(900,500);

  bg= createSprite(450,250)
  bg.addImage("play",bgImg);
  bg.addImage("end",gameOverImg)
  bg.scale = 1.4

  car = createSprite(450,250)
  car.addImage("up",upImg)
  car.addImage("down",downImg)
  car.addImage("left",leftImg)
  car.addImage("right",rightImg)
  car.scale =0.5

  score = 0
  lives= 3

 heart1 = createSprite(800,30)
 heart1.addImage(heartImg)
 heart1.scale = 0.05
 
 heart2 = createSprite(840,30)
 heart2.addImage(heartImg)
 heart2.scale = 0.05
 
 heart3 = createSprite(880,30)
 heart3.addImage(heartImg)
 heart3.scale = 0.05

  

  zombieGroup = createGroup()
  powerUpGroup= createGroup()

  edges= createEdgeSprites()


    
}

function draw(){

  background("white");
    
  drawSprites();

  
  if(car.isTouching(edges) ){
    lives = lives -1

  }
  if(lives== 3){
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;
  }


  if(lives== 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = true;
  }
  if(lives == 1){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }
  if(lives == 0){
    heart3.destroy();
    car.destroy();
    bg.changeImage("end")
    bg.scale=1.2
  }




  car.bounceOff(edges)
  zombieGroup.bounceOff(edges)
  
  for(var i = 0; i<zombieGroup.length;i++){
    if(car.isTouching(zombieGroup[i])){
      
      zombieGroup[i].velocityX = 0
      zombieGroup[i].velocityY = 0
      score = score + 2;
      zombieGroup[i].destroy()
    }
  }

  for(var i = 0; i<powerUpGroup.length;i++){
    if(car.isTouching(powerUpGroup[i])){
      lives = lives + 1;
      powerUpGroup[i].destroy()
    }
  }

  
  if(keyDown("w") ){
    car.velocityY = -10;
    car.velocityX =0;
    car.changeImage("up")

  }
  if(keyDown("s") ){
    car.velocityY = 10
    car.velocityX =0;
    car.changeImage("down")
  }
  if(keyDown("a")  ){
    car.velocityX = -10
    car.velocityY =0;
    car.changeImage("left")
  }
  if(keyDown("d")  ){
    car.velocityX = 10
    car.velocityY =0;
    car.changeImage("right")
  }

  if(lives < 3){
    spawnBoosters()
  }

  


  
  spawnZombies()

  textSize(15)
  fill("black")
  text("SCORE : "+ score,25,25 )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

function spawnZombies(){
  if(frameCount % 70 == 0){
    var zombie = createSprite(random(50,850), random(50,450))
    zombie.addImage("zombie",zombieImg)
    zombie.addImage("crush",crushZombie)
    zombie.scale= 0.4
    zombie.velocityX = random(-4,4)
    zombie.velocityY = random(-4,4)
    zombieGroup.add(zombie)

  }
  
}

function spawnBoosters(){
  if(frameCount % 1000 == 0){
    var powerUp = createSprite(random(50,850), random(50,450))
    powerUp.addImage(heartImg);
    powerUp.scale = 0.07;
    powerUpGroup.push(powerUp)
  }

}