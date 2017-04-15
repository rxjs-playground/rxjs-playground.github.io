export default [{
    title : 'Blinking boxes',
    editor : {
      js : `// Randomly color a set of boxes

  const colors = [
    "dodgerblue",
    "rebeccapurple",
    "limegreen",
    "lightgoldenrodyellow",
    "bisque",
    "darkorange",
    "deeppink"
  ]

Rx.Observable.interval(10).subscribe(() => {
 const index =  Math.floor(Math.random() * 16);
 const tile =  Array.from(document.getElementsByClassName("tile"))[index];
  const colorIndex =  Math.floor(Math.random() * colors.length);
 tile.setAttribute('style', "background-color : " + colors[colorIndex] );
})`,
html : `<style>
  .row {
    display : flex;
  }
  .tile {
    background : white;
    height : 30px;
    color: #333;
    border : 1px solid #333;
    box-sizing : border-box;
    width : 30px;
  }
</style>

<div class="grid">
  <div class="row">
    <div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div>
  </div>
  <div class="row">
    <div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div>
  </div>
  <div class="row">
    <div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div>
  </div>
  <div class="row">
    <div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div>
  </div>
</div>`
    }},{
      title : "I am going to Follow you!",
      editor : {
        js : `const canvas = document.getElementById("mycanvas"),
ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var posX = 0, posY = 0;

var radius = 15;

function drawCircle(x, y , r, fill, stroke){
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI, false);
ctx.fillStyle = fill;
ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = stroke;
ctx.stroke();
ctx.closePath();
}

function reset(){
  ctx.fillStyle = '#aaa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
  ctx.save();
  reset();
  drawCircle(centerX, centerY, radius, "burlywood", "black" );
  drawCircle(posX, posY, 4, "dodgerblue", "rebeccapurple" );
  ctx.restore();
  requestAnimationFrame(()=>draw())
}

draw()


Rx.Observable.interval(1000).subscribe(()=>{
  centerX = Math.random() * (canvas.width - (radius + 1) * 4);
  centerY = Math.random() * (canvas.height - (radius + 1) * 4);
})


Rx.Observable.interval(10).subscribe(()=>{
  if(posX > centerX){
    posX--;
  }

  if(posX < centerX){
    posX++;
  }

  if(posY > centerY){
    posY--;
  }

  if(posY < centerY){
    posY++;
  }

  if(posX == centerX && posY == centerY){
    alert("done");
  }
});`,
        html : `<canvas id="mycanvas"></canvas>`
      }
    },{
      title : 'Delayed following',
      editor : {
        js : `const canvas = document.getElementById("mycanvas"),
ctx = canvas.getContext("2d");

var centerX = canvas.width / 2,
centerY = canvas.height / 2,
dirX = 1, dirY = 1, posX = centerX, posY = centerY ;



var radius = 15;

function drawCircle(x, y , r, fill, stroke){
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI, false);
ctx.fillStyle = fill;
ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = stroke;
ctx.stroke();
ctx.closePath();
}

function reset(){
  ctx.fillStyle = '#aaa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
  ctx.save();
  reset();
  drawCircle(posX, posY, radius, "dodgerblue", "rebeccapurple" );
  drawCircle(centerX, centerY, radius, "burlywood", "black" );
  ctx.restore();
  requestAnimationFrame(()=>draw())
}

draw()


const timer =  Rx.Observable.interval(100);

timer.subscribe(()=>{
  centerX += dirX * 4;
  centerY += dirY * 4;
  if(centerX <= 2*radius || centerX >= canvas.width - 2*radius){
    dirX *= -1;
  }
  if(centerY <= 2*radius || centerY >= canvas.height - 2*radius){
    dirY *= -1;
  }
});

timer.map(()=>({
  x : centerX,
  y : centerY
})).delay(200).subscribe(({x,y})=>{
  posX = x, posY = y;
})

`,html : `<canvas id="mycanvas"></canvas>`
      }
    }
];
