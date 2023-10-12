import { writable } from 'svelte/store';
import { load } from '../db/loadDB';

export const showOnlyKeys = writable(false);

/** @type { import("../typings/types").Workspace } */
let ws1;
/** @type { import("../typings/types").Board } */
let board1;

export const ws = writable(ws1);
export const board = writable(board1);

load().then((s) => {
  // console.log(s);
  ws.set(s.ws);
  board.set(s.board);
});
