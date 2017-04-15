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
    title : "Observable.create",
    editor : {
      js : `// Observable.create

const base = Rx.Observable.create(function(observer){
  observer.next(1);
  observer.next(2);
  observer.next(42);
  observer.complete();
})


base
    .subscribe(
       v => console.log(v),
      err => console.log(err),
      done => console.log("completed")
    )`
    }
  },
  {
    title : 'Handling a click event',
    editor : {
      html : `<button id="myButton">Click me</button>`,
      js : `const button = document.getElementById("myButton");

Rx.Observable.fromEvent(button, "click")
.subscribe(x => console.log("click"))`
    }
  },{
    title : "Filtering Even numbers",
    editor : {
      html : "",
      js : `//Filter even numbers out from a list

const evenStream
   = Rx.Observable.of(15,1,2,3,4).filter(num => num % 2 == 0);

evenStream.subscribe(x => console.log(x, " is even")); `
    }
  }, {
    title : "Partitioning Even and Odd",
    editor : {
      html : "",
      js : `//Separate a list of numbers into odd and even

const [evenStream, oddStream]
   = Rx.Observable.of(15,1,2,3,4).partition(num => num % 2 == 0);

//subscribed first => gets values first
oddStream.subscribe(x => console.log(x," is odd"));
//gets values after the one above
evenStream.subscribe(x => console.log(x, " is even")); `
    }
  }
]
