import React, { Component } from 'react';
import Card from './Card';
import faces from './faces';

import './Table.css'

export default class extends Component {
  state = {
    faces: faces.map(face => ({
      ...face,
      flipped: false,
    })),
  }

  handleFlip = (index) => {
    this.setState({
      faces: this.state.faces.map((face, i) => {
        if (index !== i) {
          return face;
        }

        return {
          ...face,
          flipped: true,
        }
      })
    });
  }

  render() {
    const { faces } = this.state;
    return (
      <div className="Table">
        {faces.map((card, index) => (
          <Card
            key={index}
            index={index}
            onFlip={this.handleFlip}
            {...card}
          />
        ))}
      </div>
    )
  }
}
