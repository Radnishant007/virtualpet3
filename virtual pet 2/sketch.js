//Create variables here
var dog, happydog, dogImg, happydogImg;
var database;
var foodS, foodStock

function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happydogImg = loadImage("images/happydog.png");
}

function setup() {

  database = firebase.database()

	createCanvas(500, 500);

  dog = createSprite(200,300);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImg);
  }

  drawSprites();
  //add styles here

  fill("black");
  stroke("black");
  text("FoodStock remaining "+foodS,170,120);
  textSize(10);
  text("Press UP_ARROW Key to feed the dog", 300,20);
  textSize(10);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}

