import React, { Component } from 'react';
import Card from './Card';
import faces from './faces';

import './Table.css'

export default class extends Component {
  state = {
    candidate: false,
    flipped: 0,
    faces: faces.map(face => ({
      ...face,
      flipped: false,
    })),
  }

  handleFlip = (index) => {
    const { flipped } = this.state;
    if (flipped !== 2) {
      this.flip(index);
      this.check(index);
    };
  }

  flip = (index) => {
    this.setState({
      flipped: this.state.flipped + 1,
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

  check = (index) => {
    const { candidate } = this.state;
    if (candidate === false) {
      this.setState({ candidate: index });
      return;
    }

    this.reset(candidate, index);
  }

  reset = (c1, c2) => {
    setTimeout(() => {
      this.setState({
        candidate: false,
        flipped: 0,
        faces: this.state.faces.map((face, i) => {
          if (i !== c1 && i !== c2) {
            return face;
          }
          return { ...face, flipped: false }
        })
      })
    }, 1500);
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
