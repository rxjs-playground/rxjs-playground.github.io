import React ,{PropTypes, Component} from 'react';
export const CONSOLE_EVENT = '@@CONSOLE_EVENT';
console.log(CONSOLE_EVENT);

export default class Output extends Component{

  static contextTypes = {
    output : PropTypes.string,
    html : PropTypes.string
  }

  componentDidMount(){
    this.set();
  }

  run(){
    this.update();
  }

  set = () => {
    const frameDoc = this.iframe.contentWindow.document;
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Rxjs Playground</title>
          <style>
            html,body{
              color : white;
            }
          </style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.3.0/Rx.min.js" charset="utf-8"></script>

        </head>
        <body>

        </body>
      </html>
    `);
  }

  update = () => {
    const frameWindow =  this.iframe.contentWindow,
          frameDoc = frameWindow.document;
    frameDoc.body.innerHTML = (`
          <div id="core">
            ${this.context.html}
          </div>
    `);
    const exp = (
      `
      var console = {
          log: function(message){
              var event = new CustomEvent("${CONSOLE_EVENT}", { detail : {
                message : message
              }});
              parent.window.document.dispatchEvent(event)
          }
      };
      ${this.context.output}
      `);
     try{
       frameWindow.eval(exp)
     }catch(err){
       document.dispatchEvent(new CustomEvent(CONSOLE_EVENT,{
         detail : {
           message : err.toString()
         }
       }))
     }
  }
  render(){
    return <div id="output">
      <h3>Output</h3>
      <div>
      <iframe ref={n => this.iframe = n}>

      </iframe>
      </div>
    </div>
  }
}
