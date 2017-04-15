export default [{
    title : 'Blinking boxes',
    editor : {
      js : `// Randomly color a set of boxes

const colors = [
  "dodgerblue",
  "rebeccapurple",
  "burlywood",
  "lightgoldenrodyellow",
  "bisque",
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
    }
}];
