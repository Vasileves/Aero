var myFont;
let particles = [];
var num = 3000;
m = 1 ;
var dots =  "255,255,255,100";

preload();

var noiseScale = 0.003;

function setup() {
  createCanvas(windowWidth-30, windowHeight-30);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));

    setInterval(mouseReleased, 5000);
    
//color ifs
aqi = APIdata.data.current.pollution.aqius;

  if (aqi <= 40) {
  dots = "#ABABB7";
 // dots = "255,255,255,50";
  descr = "What a nice day to take a walk";

    
  } else if (aqi > 40 && aqi <= 60) {
    dots = "#CEBFA0";
    descr = "Open your windows, the air is almost pure";
    
  } else if (aqi > 60 && aqi <= 100) {
    dots = "#956b56";
    descr = "Alexa, turn on the purifier";
    
  } else if (aqi > 100) {
    dots = "#966a2c";
    descr = "Dude how are you still alive?";
  } 
  }

  
    
  }
  
  stroke(2000);
  stroke(205, 100);
  clear();



function preload() {
  let url = 'https://api.airvisual.com/v2/nearest_city?key=8181bc4b-a747-42e0-b3b4-ccd486557c75';
  APIdata = loadJSON(url); // saves the API data into this variable
}



function draw() {
    background(0,0,20,8);

  

  num = aqi*40;
  city = APIdata.data.city;
  wind = APIdata.data.current.weather.ws;
  noiseScale = 0.0009;
  
  

  
  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    point(p.x, p.y);
    strokeWeight(2);
    stroke(dots);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n;
    // p.x += cos(m*cos(a)); //change to m
    // p.y += cos(a);
    p.x += sin(4*a)*wind/5; //change to m
    p.y += cos(4*a)*wind/5;
    
    m=random(100);
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
    
  }
  strokeWeight(0);
  fill("#ffffff");
  textFont("Onest");
  textSize(140);
  text(city, 50, 200);
  textSize(40);
  text(descr, 60, 270);
  textSize(20);
  text("AQI: " + aqi, 60,320);

  noFill();
  stroke(255);  
  strokeWeight(3);
  rect(0,0,windowWidth-31,windowHeight-31,20);

}

function mouseReleased() {
  m+=1;
  noiseSeed(m);
  p.x = random(width);
  p.y = random(height);
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}