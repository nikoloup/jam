import React from 'react';
import ReactDOM from 'react-dom';

class App extends ReactComponent {
  render(){
    return <h1>Hello React!</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
