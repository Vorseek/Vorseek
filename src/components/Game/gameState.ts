import { atom } from 'recoil';

export const shipPositionState = atom({
  key: `shipPosition${Math.random()}`, // unique ID (with respect to other atoms/selectors)
  default: { position: { x: 10, y: 20 }, rotation: { x: 2, y: 2, z: 2 } }, // default value (aka initial value)
});

export const enemyPositionState = atom({
  key: `enemyPosition${Math.random()}`, // unique ID (with respect to other atoms/selectors)
  default: [
    { x: -10, y: 10, z: -80 },
    { x: 20, y: 15, z: -100 },
    { x: 10, y: 20, z: -150 },
    { x: -15, y: 14, z: -170 },
  ], // default value (aka initial value)
});

export const laserPositionState = atom({
  key: `laserPositions${Math.random()}`, // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const scoreState = atom({
  key: `score${Math.random()}`, // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
