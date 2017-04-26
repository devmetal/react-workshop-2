import * as Actions from './actions';

const defaultState = {
  faces: [],
  candidates: [],
  flipped: 0,
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
      }
      case Actions.PAIR: return {
        ...face,
      }
      case Actions.RESET: return {
        ...face,
      }
      default:
        return face;
    }
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.INIT: return {
      ...state,
    }
    case Actions.FLIP: return {
      ...state,
    }
    case Actions.PAIR:
    case Actions.RESET:
      return {
        ...state,
        faces: faces(state.faces, action)
      }
    default: return state;
  }
}
