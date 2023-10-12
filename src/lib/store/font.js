import { writable } from 'svelte/store';
import db from '../db/db';

// export const font = writable(db.font.get());
export const font = writable({
  size: 14,
  family: 'Default'
});

db.font?.get().then((f) => {
  // console.log({ f });
  if (f) font.set(f);
});
