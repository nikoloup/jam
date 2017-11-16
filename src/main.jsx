import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from './components/component_Grid.jsx';

class App extends React.Component {
  render(){
    return <Grid />;
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
