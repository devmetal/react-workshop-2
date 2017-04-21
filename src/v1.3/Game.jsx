import React, { Component } from 'react';
import Score from './Score';
import Table from './Table';
import faces from './faces';

import './Table.css'

export default class extends Component {
  state = {
    candidate: false,
    flipped: 0,
    score: 0,
    faces: faces.map(face => ({
      ...face,
      flipped: false,
      frozen: false,
    })),
  }

  componentDidMount() {
    this.shuffle();
  }

  shuffle = () => {
    const _ = (a) => {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
    }

    this.setState({
      faces: [..._(this.state.faces)],
    })
  }

  handleFlip = (index) => {
    const { flipped } = this.state;
    if (flipped !== 2) {
      this.flip(index);
      this.check(index)
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
    const { faces, candidate } = this.state;
    if (candidate === false) {
      this.setState({ candidate: index });
      return;
    }

    if (faces[candidate].title === faces[index].title) {
      this.freeze(candidate, index);
    } else {
      this.reset(candidate, index);
    }
  }

  freeze = (c1, c2) => {
    this.setState({
      candidate: false,
      flipped: 0,
      score: this.state.score + 1,
      faces: this.state.faces.map((face, i) => {
        if (i !== c1 && i !== c2) {
          return face;
        }
        return {
          ...face,
          flipped: true,
          frozen: true,
        }
      }),
    })
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
      <div>
        <Table faces={faces} onFlip={this.handleFlip} />
        <Score score={this.state.score} />
      </div>
    )
  }
}
