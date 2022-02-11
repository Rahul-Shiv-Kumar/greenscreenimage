var fgimg = null;
var bgimg = null;
var can1 = document.getElementById("can");
var can2 = document.getElementById("can2");
function loadForegroundImg(){
  var imgfile = document.getElementById("fgimg");
  fgimg = new SimpleImage(imgfile);
  var canvas = document.getElementById("can");
  fgimg.drawTo(canvas);
}

function loadBackgroundImg(){
  var imgfile = document.getElementById("bgimg");
  bgimg = new SimpleImage(imgfile);
  var canvas = document.getElementById("can2");
  bgimg.drawTo(canvas);
}

function composite() {
  if (bgimg.getHeight() !== fgimg.getHeight() || bgimg.getWidth()!== fgimg.getWidth()) {
   bgimg.setSize(fgimg.getWidth(), fgimg.getHeight());}
   var result = new SimpleImage (fgimg.getWidth(), fgimg.getHeight()); 
   for (var pixel of fgimg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
     if (pixel.getGreen() > 240) {
      var pixelbg = bgimg.getPixel(x,y);
      result.setPixel(x,y,pixelbg);
      }  
     else {
      result.setPixel(x,y,pixel); 
      }
    }
   return result;
  }

function greenScreen() {
 if (fgimg == null||!fgimg.complete()) {
   alert("foreground not loaded");
   return;
   }
 if (bgimg == null|| !bgimg.complete ()) {
   alert ("background not loaded");
   return;
   }  
 else {
  clearCanvas(); 
  var final = composite();
  final.drawTo(can1);
 } 
}
function clearCanvas(){
  var context = can1.getContext("2d");
  context.clearRect(0, 0, can1.width, can1.height);   
  var context2 = can2.getContext("2d");
  context2.clearRect(0, 0, can2.width, can2.height); 
}