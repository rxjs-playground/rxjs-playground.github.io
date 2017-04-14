export default [
  {
    title : 'Naive 1-way data binding',
    editor : {
      html : `<input data-bind="myText" type="text" placeholder="Enter something here"/>
<p data-observe="myText"></p>

<input data-bind="anotherText" type="text" placeholder="Enter something here"/>
<p data-observe="anotherText"></p>
<p data-observe="anotherText"></p>`,
      js : `//Naive one way data binding

Rx.Observable.from(document.querySelectorAll("[data-observe]"))
.map( k => {
  const input = document.querySelectorAll("[data-bind='"+k.getAttribute("data-observe")+"']");
  return Rx.Observable.fromEvent(input, "input").map(e => {
    return {
    element : k,
    value : e.target.value
  }
  });
}).mergeAll().subscribe( ({element,value}) => element.innerHTML = value )
    `
    }
  }
]
