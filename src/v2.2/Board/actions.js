export const FLIP = 'FLIP';
export const PAIR = 'PAIR';
export const FAIL = 'FAIL';
export const RESET = 'RESET';
export const INIT = 'INIT';
export const WIN = 'WIN';

const flip = (index) => ({
  type: FLIP, cards: [index]
});

const pair = (cards) => ({
  type: PAIR, cards
});

const fail = () => ({
  type: FAIL,
});

const reset = (cards) => ({
  type: RESET, cards
});

const win = () => (dispatch) => {
  setTimeout(() => {
    alert('You Win!');
    dispatch(init());
  }, 1500);
}

export const check = (index) => (dispatch, getState) => {
  const { faces, flipped } = getState().game;

  if (flipped === 2) {
    return;
  }

  dispatch(flip(index));
  const { candidates } = getState().game;

  if (candidates.length === 2) {
    if (isPair(faces[candidates[0]], faces[candidates[1]])) {
      dispatch(pair(candidates));
      if (isWin(getState)) {
        dispatch(win());
      }
      return;
    }

    dispatch(fail());
    setTimeout(() => {
      dispatch(reset(candidates));
    }, 1500);
  }
};

const isWin = (getState) => {
  const { game: { faces, scores } } = getState()
  return faces.length / 2 === scores;
}

const isPair = (c1, c2) => {
  return c1.title === c2.title;
}

const initialFaces = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
].map((face) => ({
  ...face,
  flipped: false,
  frozen: false,
}));

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

export const init = () => ({
  type: INIT, faces: shuffle(initialFaces)
})
