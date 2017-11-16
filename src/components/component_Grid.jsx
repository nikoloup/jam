import React from 'react';
import { GridItem } from './component_GridItem.jsx';

export class Grid extends React.Component{
  constructor(props){
    super(props);
    this.state = {items: []};
  }

  render(){
    return <p>Grid</p>;
  }
}
