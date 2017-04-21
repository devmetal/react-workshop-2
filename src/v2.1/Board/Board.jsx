import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Table from './components/Table';
import Score from './components/Score';

class Board extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.init());
  }

  handleFlip = (index) => {
    this.props.dispatch(Actions.check(index));
  }

  render() {
    const { faces, scores } = this.props;
    return (
      <div>
        <Table faces={faces} onFlip={this.handleFlip} />
        <Score score={scores} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  faces: state.game.faces,
  scores: state.game.scores,
});

export default connect(mapStateToProps)(Board);
