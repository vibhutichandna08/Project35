var dog, happyDog;
var database;
var foodS;
var foodStock;

function preload(){
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dogSprite = createSprite(250,250,10,10);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(2);
  text("Note : Press Down Arrow Key to Feed Tom Milk !" , 25,25);
  text("Note : Press UP Arrow Key to Restock !" , 25, 50);
  text(foodS, 280, 151)
  text("Food Remaining: ", 125, 150)
  
}

//To read values
function readStock(data){
  foodS = data.val();
}

//To write values
function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else if (keyWentDown(UP_ARROW)){
    x = x + 1;
    if (x >= 20) {
      x = 20;
    }
  }  
  else {
    x = x - 1;
  }

  
  database.ref('/').update({
    Food : x,
  })
}


