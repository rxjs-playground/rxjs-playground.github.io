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
  },
  {
    title : 'Basic promises',
    editor : {
      html : ``,
      js : `const p = new Promise((resolve, reject) => {
    setTimeout(()=>{
       resolve(42)
    },3000)
})

Rx.Observable.fromPromise(p).subscribe(val => console.log(val));
    `
    }
  },{
    title : "ThrottleTime",
    editor : {
      html : ``,
      js : `
//Throttling

// One click allowed per 2 seconds

Rx.Observable.fromEvent(document, "click")
.throttleTime(2000)
.subscribe(x => console.log("click"))
`
    }
  },{
    title : "Merge",
    editor : {
      html : ``,
      js : `
      // Merge 2 observables


      const hundreds = Rx.Observable.interval(1000);

      const three_hundreds = Rx.Observable.interval(1500);

      hundreds.merge(three_hundreds)
      .subscribe(console.log)
`
    }
  },{
    title : "Subjects",
    editor : {
      js : `const store = new Rx.Subject();

  store.subscribe(v => console.log(v));

  store.next(1)
  store.next(2)
  store.next(3)`
    }
  }
]
