/*
=================================
			2014-11-04
			made by YUN
=================================
*/

function getDistance(e) {
	var dis = Math.sqrt(Math.pow(e.targetTouches[0].pageX - e.targetTouches[1].pageX, 2) + 
               Math.pow(e.targetTouches[0].pageY - e.targetTouches[1].pageY, 2));
	return dis;
}

(function() {
    var root = this; //global object

    var ImgTouchObject = function(options) {
        if( !options || !options.target || !options.img1) {
            throw 'ImgZoom constructor: missing arguments img tag';
        }

		this.target = options.target;
        this.image1 = options.img1;
        this.image2 = options.img2;
		this.image3 = options.img3;
        
        this.position = {
            x: 0,
            y: 0
        };
        
        this.lastX = null;
        this.lastY = null;
        this.index=1;
        this.walk = 0;
        this.flag = false;
        this.opacity = 1;
        this.walkPerTarget = 22;
        this.init = false;
        this.lblindex = 0;
        this.lbldistance = (this.target.clientWidth/6);
        this.lblwalk = 0;
        
        this.linkstart = 1010;
        this.linkend = 1490;
        this.resoultion = (this.target.clientHeight/372);
        this.linkflg = false;
        this.linkNum = 0;
        this.setEventListeners();
    };

    ImgTouchObject.prototype = {
        doMove: function(relativeX, relativeY) {
            if(!this.init || musicFlg){
                document.getElementById("music").play();
                musicFlg = false;
                $("#hand").hide();
            }
            this.init = true;
            if (this.lastX && this.lastY) {
              var deltaX = relativeX - this.lastX;
              var deltaY = relativeY - this.lastY;
              var dx = this.position.x + deltaX;
              
              if ((this.image2.clientWidth+dx-this.target.clientWidth*1.5)<0){
                  return;    
              }
              else if (dx>=0){
                  return;
              }
              
              if((this.target.clientWidth*1.5-this.image2.clientWidth) >= (dx-10)){
                  if(this.flag==false){
                      this.flag = true;
                      //animateLbl(6);
                      //this.lblwalk=0;
                      animatePerson(1,this.flag);
                  }
              }
              
//              if(this.flag) return;
              if(deltaX<0 && this.flag){
                  return;
              }
              else if(deltaX>0 && this.flag){
                  window.clearInterval(int);
                  this.flag = false;
              }
              if($("#lbl").text()!="") $("#lbl").empty();     
              this.walk += -deltaX;
              if(this.walk >= this.walkPerTarget){
                this.walk = 0;
                this.index++;
                if(this.index > 8) this.index = 1;
              }
              else if(this.walk <= -this.walkPerTarget){
                this.walk = 0;
                this.index--;
                if(this.index < 1) this.index = 8;
              }
              
/*              if((this.image2.clientWidth-this.target.clientWidth*2.5 + (dx -10))<=0){
                  this.lblwalk += -deltaX;
                  
                  if(this.lblwalk>=this.lbldistance){
                      this.lblwalk -= this.lbldistance;
                      this.lblindex++;
                      if(this.lblindex>=6){
                          this.lblindex=6;
                          this.lblwalk=0;
                      }
                      animateLbl(this.lblindex);
                  }
                  else if(this.lblwalk<=-this.lbldistance){
                      this.lblwalk += this.lbldistance;
                      this.lblindex--;
                      if(this.lblindex<1){
                          this.lblindex=1;
                          this.lblwalk=0;
                      }
                      animateLbl(this.lblindex);
                  }
              }
              else{
                 $(".lbl").hide();
                 this.lblwalk=0;
                 this.lblindex=0; 
              } *///animate lbl
              
//              $("#link1").css("left",this.linkstart*this.resoultion+(this.target.clientWidth*this.resoultion)+(dx));
//              $("#startIMG").css("left",this.target.clientWidth*0.087+(dx));
              
              animatePerson(this.index,this.flag);
              this.position.x = dx;
              this.position.y += deltaY;
            }
//$("#test").val("Move : "+($("#person"+this.index).css("bottom")) +" : "+this.index);

            this.lastX = relativeX;
            this.lastY = relativeY;
            this.image1.style.webkitTransform = 'translate('+(this.position.x*0.3)+'px,0px)';
            this.image2.style.webkitTransform = 'translate('+(this.position.x*1)+'px,0px)';
            this.image3.style.webkitTransform = 'translate('+(this.position.x*1)+'px,0px)';
        },

        setEventListeners: function() {
            this.target.addEventListener('touchstart', function(e) {
                this.lastX          = e.targetTouches[0].pageX;
                this.lastY          = e.targetTouches[0].pageY;
            }.bind(this));

            this.target.addEventListener('touchmove', function(e) {
                e.preventDefault();
                
                var relativeX = e.targetTouches[0].pageX;// - this.target.getBoundingClientRect().left;
                var relativeY = e.targetTouches[0].pageY;// - this.target.getBoundingClientRect().top;      
                this.doMove(relativeX, relativeY);
            }.bind(this));
            
            this.target.addEventListener('touchend', function(e) {
                e.preventDefault();
            }.bind(this));
        },
        	
        getParameter: function() {
        	return this.position;
        }
    };

    root.ImgTouchObject = ImgTouchObject;
}).call(this);