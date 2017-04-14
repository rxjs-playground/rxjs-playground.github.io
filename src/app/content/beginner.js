export default [
  {
    title : 'Getting Started with Rx.js',
    editor : {
      html : '',
      js : `// A simple illustration to count to 3.
Rx.Observable.interval(1000).take(3).subscribe(v => console.log(v))
    `
    }
  },
  {
    title : 'Handling a click event',
    editor : {
      html : `<button id="myButton">Yo</button>`,
      js : `const button = document.getElementById("myButton");

Rx.Observable.fromEvent(button, "click")
.subscribe(x => console.log("click"))`
    }
  }
]
