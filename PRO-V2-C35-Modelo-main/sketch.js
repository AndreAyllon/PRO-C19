var foguete,fogueteImage;
var database;
var height;
var asteroidImage,asteroid;
var space;
var sun, sunImage;
var earth, earthImage;
var asteroidGroup;
var laser, laserImage;
var score = 0;
var gameState = PLAY;
var PLAY,END;
var gameOver, restart; 
var gameOverImage;

function preload(){
   bg =loadImage("Images/space1.png");
 fogueteImage = loadImage("Images/foguete.png");

asteroidImage = loadImage("Images/asteroid.png");
sunImage = loadImage("Images/sun.png");
earthImage = loadImage("Images/earth.png");
laserImage = loadImage("Images/laser.png");
gameOverImage = loadImage("Images/fimdeJogo.png");

}


//Função para definir o ambiente inicial
function setup() {

   database=firebase.database();

  createCanvas(1000,700);
  space = createSprite(750,250);
  space.addImage("space",bg);
  space.velocityX = -0.8;
  space.scale = 1.5;
  

asteroidGroup = new Group();
 
sun = createSprite(875,118,50,70);
sun.addImage("sun",sunImage);
sun.scale = 1

earth = createSprite(100,600,10,10);
earth.addImage("earth",earthImage);
earth.scale = 0.5;


foguete =createSprite(100,500,150,150);
foguete.addImage("foguete",fogueteImage);
foguete.scale= 0.3;


laser = createSprite(foguete.position.x, foguete.position.y);
laser.addImage(laserImage);
laser.scale = 0.09;
// torna o laser invisível inicialmente
laser.visible = false; 

gameOver = createSprite(300,400);
gameOver.addImage(gameOverImage);
gameOver.scale= 0.8;
gameOver.visible = false;

}


function draw() {

  background("black");

// Desenha os sprites na tela
drawSprites();  

fill("white");
textSize(20);
text("score: "+score, 50,100);

fill(0);
stroke("white");
textSize(25);
text("**Use as setas para mover o foguete",40,40);

  if(space.x < 250){
    space.x = 750;
  }

if(gameState === PLAY){
score = score + Math.round(getFrameRate()/60);
if (keyDown("space")) {
  // define a posição do laser como a posição atual da nave
  laser.position.x = foguete.position.x;
  laser.position.y = foguete.position.y;

  laser.visible = true;
  laser.velocityX = 10;


}

// verifica se o laser colidiu com o asteroide
if (laser.isTouching(asteroidGroup)) {
  // destrói o asteroide e o laser
  asteroidGroup.destroyEach();
  laser.visible = false;  
}

if(keyDown(LEFT_ARROW)){
  foguete.x -= 10;
}
else if(keyDown(RIGHT_ARROW)){
  foguete.x += 10;
}
else if(keyDown(UP_ARROW)){
  foguete.y -= 10;
}
else if(keyDown(DOWN_ARROW)){
  foguete.y += 10;
}
// Cria novos asteroides
spawnAsteroid();

for (var i = 0; i < asteroidGroup.length; i++) {
  asteroidGroup.get(i).x -= 4;
}
 if(asteroidGroup.isTouching(earth)){
 gameState = END;
 }

}

 else if(gameState === END){
  fill("gray");
  textSize(50);
  text("Presione R para Reiniciar",200,200);
  gameOver.visible = true;
  if(keyDown(R)){
    reset();
 }
  



  // fechando a função draw()
}

function spawnAsteroid(){
 if(frameCount%60 === 0){
  var asteroid = createSprite(1000,70,40,40);
  asteroid.y = Math.round(random(-20,300));
  asteroid.x = Math.round(random(500,1000));
  asteroid.addImage("asteroidImage",asteroidImage);
  asteroid.scale = 0.5;

 asteroid.velocityX = -10;
 asteroid.velocityY = 10;
 asteroid.lifetime = 500;
asteroidGroup.add(asteroid);



for(var i = 0; i < asteroidGroup.length; i++) {
  if(asteroidGroup.get(i).isTouching(foguete)) {
    // destroi o foguete
    foguete.destroy();

   setTimeout(function() {
      noLoop();
   }, 1300);
   
}
}

for(var i = 0; i < asteroidGroup.length; i++) {
  if(asteroidGroup.get(i).isTouching(earth)) {
    // destroi a terra
    earth.destroy();

   setTimeout(function() {
      noLoop();
   }, 1300);
   

}
}
}
}
}




