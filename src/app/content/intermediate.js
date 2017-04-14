export default [
  {
    title : 'Clicks and double clicks',
    editor : {
      html : ``,
      js : `const clickObservable = Rx.Observable.fromEvent(document, "click")
clickObservable.subscribe(() => console.log("click"));

clickObservable.bufferTime(250)
.map(arr => arr.length)
.filter(len => len == 2 )
.subscribe(x => console.log("double click"))
    `
    }
  }
]
