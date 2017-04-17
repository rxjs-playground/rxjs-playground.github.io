export default [
  {
    title : '.interval()',
  editor : {
    js : `
// An operator than is similar to setInterval
// Pushes data to an operator every 1sec
Rx.Observable.interval(1000).subscribe(val => console.log(val))
`
  }
},   {
    title : '.of()',
  editor : {
    js : `
// An operator which takes values synchronously and emits them
// in the same order

Rx.Observable.of(1,2,3).subscribe(val => console.log(val))
`
  }
}, {
  title : '.from()',
  editor : {
    js : `

// An observable which is similar to .of
// However it takes an array or an array like object as an argument

console.log("Array")
Rx.Observable.from([1,2,3,4]).subscribe(val => console.log(val));

console.log("Array like object")
Rx.Observable.from({length : 5}).subscribe(val => console.log(val));


console.log("Set")
Rx.Observable.from(new Set([1,2,3])).subscribe(val => console.log(val));



`
  }
},{
  title : `.take()`,
  editor : {
    js : `
// An observable which takes the first N values

Rx.Observable.from([1,2,3,4,5]).take(3).subscribe(val => console.log(val))

Rx.Observable.interval(1000).take(5).subscribe(val => console.log(val))
`
  }
},{
  title : `.first() .last()`,
  editor : {
    js : `

//Since first and last values are common practises

Rx.Observable.from([1,2,3,4,5]).first().subscribe(val => console.log(val))

Rx.Observable.from([1,2,3,4,5]).last().subscribe(val => console.log(val))


//First and last functions also take predicate functions

// Let's print the first odd number in this series
Rx.Observable.from([2,8,3,4,5]).first(x => x % 2 == 1).subscribe(val => console.log(val))

// Let's print the last odd number in this series
Rx.Observable.from([2,8,3,4,5,900]).last(x => x % 2 == 1).subscribe(val => console.log(val))



Rx.Observable.interval(1000).first().subscribe(val => console.log(val))
// Last does not apply to interval() as it never complets

//Rx.Observable.interval(1000).take(5).subscribe(val => console.log(val))



`
  }
}, {
  title : ".filter()",
  editor : {
    js : `
// filter operators helps to filter a stream of values using a predicate function

// All numbers greater than 5
console.log("printing  numbers > 3")
Rx.Observable.of(1,2,3,4,5,6,7).filter(x => x > 3).subscribe(x => console.log(x));

// odd numbers
console.log("printing odd numbers")
Rx.Observable.of(1,2,3,4,5,6,7).filter(x => x % 2 === 1).subscribe(x => console.log(x));


// odd numbers greater than 3
console.log("printing odd numbers greater than 3")
Rx.Observable.of(1,2,3,4,5,6,7).filter(x => x % 2 === 1).filter(x => x > 3).subscribe(x => console.log(x));
`
  }
}, {
  title : `.partition()`,
  editor : {
    js : `
// partition operators helps to filter a stream of values using a predicate function
// however instead of only creating one stream which has values which pass
// the predicate function, it also creates a stream of values which don't pass the
// condition

// All numbers greater than 5

const [greaterThan3, lessThan3] = Rx.Observable.of(1,2,3,4,5,6,7).partition(x => x > 3);
console.log("printing  numbers > 3")
greaterThan3.subscribe(x => console.log(x));
console.log("printing  numbers <= 3")
lessThan3.subscribe(x => console.log(x));

`
  }
}
]
