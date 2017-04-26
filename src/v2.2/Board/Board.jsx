import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Table from './components/Table';
import Score from './components/Score';
import Trials from './components/Trials';

class Board extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.init());
  }

  handleFlip = (index) => {
    this.props.dispatch(Actions.check(index));
  }

  render() {
    const { faces, scores, trials } = this.props;
    return (
      <div>
        <Table faces={faces} onFlip={this.handleFlip} />
        <Score score={scores} />
        <Trials trials={trials} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  faces: state.game.faces,
  scores: state.game.scores,
  trials: state.game.trials,
});

export default connect(mapStateToProps)(Board);
