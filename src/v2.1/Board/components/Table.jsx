import React, { Component } from 'react';
import Card from './Card';

import './Table.css'

export default class extends Component {
  render() {
    const { faces, onFlip } = this.props;

    return (
      <div className="Table">
        {faces.map((card, index) => (
          <Card
            key={index}
            index={index}
            onFlip={onFlip}
            {...card}
          />
        ))}
      </div>
    );
  }
}
