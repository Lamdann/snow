/**
 * Created by Lamdan on 3/31/2017.
 */
'use strict';
function  snowflake() {
   this.x=0.0;
    this.y=0.0;
    this.r=3;
    this.rCopy = 0;
    this.col="white";
    this.h=800;
    this.w=1200;
    this.id=null;
    this.xOutR = 1200+this.r*2+1;
    this.xOutL = 0- this.r*2 -1;
    this.yOutD = 800+this.r*2+1;
    this.inflate = false;
    this.speed={
        x:0,
        y:0.1
    };
    this.ctx=null;

    this.clear = function (s,ctx) {
        ctx.clearRect(s.x-s.r, s.y-s.r ,s.r*2,s.r*2);
    };
    this.draw = function (s,ctx) {
        if(s.r<=10){
            circle(s.x, s.y, s.r, true, s.col,ctx);
        }else if(s.image!=undefined){
            if(s.inflate&&s.notShown){
				if(s.inflateUp){
					if(s.r<130){
						s.r+=getRandomFloat(0.001,0.1);
					}else{
						s.inflateUp =false;
					}
				}else{
					if(s.r>s.rCopy )
					{
						s.r-=getRandomFloat(0.001,0.1);
					}
					else{
						s.inflateUp =true;
						s.notShown = false;
					}
                }
            }
                s.drawImageFlake(s.x, s.y, s.r,ctx,s.image);
        } else {
            circle(s.x, s.y, s.r, true, s.col, ctx);
        }

    };
    this.calc = function (s) {
        if(s.randDerect)
        {
            if(s.currPeriod>=s.randPeriod) {
                s.speed = getRandSpeed(0.1,0.5,2.5,5);
                s.currPeriod =0;
            }
            else{s.currPeriod++;}
        }
        if( (s.x<=s.xOutL||s.x>=s.xOutR )|| (s.y>= s.yOutD ) ){			
			s.y = 0-s.r*2;
            s.x= getRandomFloat(0,s.w);
			s.notShown =true;
			
        }else{
            s.x+=s.speed.x+s.wind;
            s.y+=s.speed.y;
        }


    };
    this.clearAll = function(s,ctx,width,height){
        ctx.clearRect(0-s.r*2, 0-s.r*2,width,height);
    };
    this.randDerect = true;
    this.randPeriod = 30;
    this.currPeriod = 0;
    this.wind = 0;
    this.image = null;
    this.drawImageFlake = function (x,y,r,ctx,image){
        if(image!=undefined )
        ctx.drawImage(image,x,y,r,r);
    };
    return this;

}
//-----------------------------------------------------------------------------------------------
function getRandSpeed(minX,maxX,minY,maxY) {
   let  speed={};
   let mnoj = getRandomFloat(0,10)>5?1:-1;
    speed.x =getRandomFloat(minX,maxX)*mnoj;
    speed.y = getRandomFloat(minY,maxY);
   return speed;
}
//-----------------------------------------------------------------------------------------------
function getRandomFloat   (min, max) {
    return Math.random() * (max - min + 1) + min;
}
//------------------------------------------------------------------------------------------
function getRandomInt   (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//------------------------------------------------------------------------------------------
function circle(x, y, radius, fillCircle, color,ctx) {
    if(fillCircle==true){
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.fill();
    }
    else {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.stroke();
    }
}
//-----------------------------------------------------------------------------------------------------
function initRandomSnowFlake(num,r,color,canvasW,canvasH,speed,ctx,randDerect,maxRandPeriod,images){
    let snow =[];
    for(let i = 0;i<num;i++){
       let s = new  snowflake();
       s.ctx = (ctx     != undefined) ? ctx:null;
       s.r   = (r       != undefined) ? r:s.r;
       s.rCopy =  s.r;
       s.col = (color   != undefined) ? color:s.col;
       s.h   = (canvasH != undefined )? canvasH:s.h;
       s.w   = (canvasW != undefined )? canvasW:s.w;
       s.speed = (speed != undefined )? speed:s.speed;

       s.x = getRandomFloat(0,s.w);
       s.y = getRandomFloat(0,s.h);
	   s.inflateUp = true;
	   s.notShown =true;
       s.randDerect = (randDerect!=undefined)?randDerect:s.randDerect;
        if(randDerect) {
            s.randPeriod = getRandomFloat(maxRandPeriod/10,maxRandPeriod);
        }
        if(images!=undefined) {
            let img = new Image();
            img.src = images[getRandomInt(0,images.length-1)];

            s.image = img;
        }
        s.xOutR = canvasW+r*2+1;
        s.xOutL = 0 -r*2-1;
        s.yOutD = canvasH+r*2+1;
       snow.push(s);

    }
return snow;
}
//-------------------------------------------------------------------------------------------------------
