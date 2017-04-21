import React, { Component } from 'react';
import Logo from './logo.svg';

import './Card.css'

export default class extends Component {
  flip = () => {
    const {flipped, index, onFlip } = this.props;
    if (flipped) {
      return;
    }
    onFlip(index);
  };

  render() {
    const { flipped, title } = this.props;
    
    let flippedCSS = flipped ? " Card-Back-Flip" : " Card-Front-Flip";
    
    return (
      <div className="Card" onClick={this.flip}>
        <div className={"Card-Front" + flippedCSS}>
          <img src={Logo} alt="Logo"/>
        </div>
        <div className={"Card-Back" + flippedCSS}>
          <h1>{title}</h1>
        </div>
      </div>
    );
  }
}
