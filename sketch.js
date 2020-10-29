var dog,happyDog,dogg;
var dogImg,database,foodS,foodStock;

var feedTime,food;
var lastFed=0
var feed,addFood;

function preload(){
    dogImg = loadImage("Dog.png")
    dogg = loadImage("DogSleeping.png")
    happyDog= loadImage("happydog.png")
}

function setup() {
   createCanvas(700, 600);
    database=firebase.database();
	
    foodObj = new Food();
	
    foodStock=database.ref('food');
    foodStock.on("value",readStock);
	
    dog = createSprite(250,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3

    
  
  
//     feedTime=database.ref('feedTime')
//     feedTime.on("value",function(data){
//         lastFed=data.val();
//     })

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
	  
  
}


function draw() {  
  background(46, 139, 87)
  
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
	
/*if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog);
}

  if(keyWentDown(DOWN_ARROW)){
    writeStockk(foodS)
    dog.addImage(happyDog);
  */

  
  
  stroke("magenta")
  
  textSize(20)
  fill(255,255,254);
	
   if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
	
 drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
// function writeStock(x){
//   if (x<=0) {
//     x=0;
//   }else{
//     x=x-1
//   }
//   database.ref('/').update({
//     food:x   
//   })
// }

// function writeStock(x){
//   if (x<=0) {
//     x=x+20
//   }
//    database.ref('/').update({
//     food:x
//   })
// }

function showError(){
  console.log("Error in writing to the database");
}
 
  /*text("NOTE : Press UP_ARROW Key To Feed Drago Milk!",20,50)
  text("NOTE : Press DOWN_ARROW Key To Refill the milk!",20,400)
  text("Food left :"+ foodS,200,100)*/
  //foodS.update

/*readStock(data);
writeStock(x);
showError();
*/
  //add styles here
