export const FLIP = 'FLIP';
export const PAIR = 'PAIR';
export const RESET = 'RESET';
export const INIT = 'INIT';

const flip = (index) => ({
  type: FLIP, cards: [index]
});

const pair = (cards) => ({
  type: PAIR, cards
});

const reset = (cards) => ({
  type: RESET, cards
});

export const check = (index) => (dispatch, getState) => {
  const { faces, flipped } = getState().game;

  if (flipped === 2) {
    return;
  }

  dispatch(flip(index));
  const { candidates } = getState().game;

  if (candidates.length === 2) {
    if (faces[candidates[0]].title === faces[candidates[1]].title) {
      return dispatch(pair(candidates));
    }
    setTimeout(() => {
      dispatch(reset(candidates));
    }, 1500);
  }
};

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
