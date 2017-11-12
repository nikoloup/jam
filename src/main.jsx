import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render(){
    return <h1>Hello React!</h1>;
  }
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if(loadedStates.includes(document.readyState) && document.body){
    ReactDOM.render(<App />, document.getElementById('app'));
}
else{
    document.addEventListener("DOMContentLoaded", function(event) {
      ReactDOM.render(<App />, document.getElementById('app'));
    }, false);
}
