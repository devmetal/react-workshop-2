import * as Actions from './actions';

const defaultState = {
  faces: [],
  candidates: [],
  flipped: 0,
  scores: 0,
  trials: 0,
}

const faces = (state = [], action) => {
  const { type, cards } = action;
  return state.map((face, index) => {
    if (!cards.includes(index)) {
      return face;
    }

    switch (type) {
      case Actions.FLIP: return {
        ...face,
        flipped: true,
      }
      case Actions.PAIR: return {
        ...face,
        frozen: true,
      }
      case Actions.RESET: return {
        ...face,
        flipped: false,
      }
      default:
        return face;
    }
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.INIT: return {
      ...defaultState,
      faces: [...action.faces],
    }
    case Actions.FLIP: return {
      ...state,
      flipped: state.flipped + 1,
      candidates: [...state.candidates, action.cards[0]],
      faces: faces(state.faces, action)
    }
    case Actions.PAIR:
      return {
        ...state,
        flipped: 0,
        scores: state.scores + 1,
        candidates: [],
        faces: faces(state.faces, action),
      }
    case Actions.FAIL:
      return {
        ...state,
        trials: state.trials + 1,
      }
    case Actions.RESET:
      return {
        ...state,
        flipped: 0,
        candidates: [],
        faces: faces(state.faces, action),
      }
    default: return state;
  }
}
