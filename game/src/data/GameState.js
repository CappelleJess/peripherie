const GameState = {
  souvenirScore: 0,
  ancragePasse: 0,
  emergenceNostalgie: 0,

  interactions: {
    flower: null, // examine, smell, ignore
    frame: null,
    book: null
  },

  dialogueOpen: false,
  objectsInteracted: 0
};

export default GameState;