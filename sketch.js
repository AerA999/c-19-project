
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;

var bg, cake, puf, cookie, reset, go;
var bg_img, cake_img, puf_gif, restart_img, go_img;
var ground, invisibleGround


function preload(){
bg_img= loadImage ("bg.png");
cake_img= loadImage("cake.png")
puf_gif= loadImage ("puf.gif");
restart_img= loadImage("reset.jpg");
go_img= loadImage("go.gif");

    
}

function setup() {
 
    createCanvas(windowWidth, windowHeight)

  cakeGroup=new Group();
  
  bg= createSprite(width/2, height/2)
    bg.addImage(bg_img);
   bg.scale=0.75
   bg.velocityX=-3.5

   invisibleGround=createSprite(width/2, height-200, width, 10)
   invisibleGround.visible=false 
   
   black= createSprite(width/2, height/2, width, height);
  black.visible=false;
  
  
  gameOver= createSprite(width/2-70, height/2-50);
  gameOver.addImage(go_img);
  gameOver.visible=false;

  restart=createSprite(width/2-50, height/2+60)
  restart.addImage(restart_img)
  restart.scale=0.3
  restart.visible=false;


   puf= createSprite(130, 570, 20, 50)
   puf.addImage(puf_gif);
   puf.scale=2


}

function draw() {
      
      background ("white");

      textSize (30);
        fill("blue");
        text ("Score: "+ score, width-150, 40)
       
      if (gamestate===PLAY){
        //jump
        if (keyDown("space")&& puf.y>500) {
            puf.velocityY=-30
        }
        //gravity
        puf.velocityY= puf.velocityY+1.2

        //scrolling bg
        if (bg.x <=380) {
        bg.x=width/2;
        }

        //score
        
        score= score+1

        spawnCake();
        //change state
        if(cakeGroup.isTouching(puf)){
        
          

          gamestate=END;
        }
      }



      else if(gamestate===END){
          black.visible=true;
          restart.visible=true;
          gameOver.visible=true;
          cakeGroup.setVelocityXEach(0);
          textSize (30);
        fill("blue");
        text ("Score: "+ score, width-150, 40)
          cakeGroup.setLifetimeEach(-1)
          
    

         
          }
          
          if(mousePressedOver(restart) && gamestate===END) {         
            cakeGroup.destroyEach();
            gamestate=PLAY;
          
            gameOver.visible=false;
            restart.visible=false;
            black.visible=false;
            puf.velocityY=0;
            score= 0
             
              
            }


          puf.collide(invisibleGround); 

      

      drawSprites();
    
    }

  

function spawnCake(){


  if(frameCount%200===0){
    cake=createSprite(width, height-255, 20, 50)
    cake.addImage(cake_img);
        cake.velocityX=-10
        cake.scale=0.375

        cakeGroup.add(cake);
        cake.lifetime=width/10

  

  } 

    
  }

