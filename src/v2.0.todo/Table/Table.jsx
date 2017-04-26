import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Card from './components/Card';

import './Table.css'

class Table extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.init());
  }

  handleFlip = (index) => {
    this.props.dispatch(Actions.check(index));
  }

  render() {
    const { faces } = this.props;
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

const mapStateToProps = (state) => ({
  faces: state.game.faces
});

export default connect(mapStateToProps)(Table);
