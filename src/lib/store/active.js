import db from '../db/db';
import { writable, derived } from 'svelte/store';

const current = 'current';

export const activeProject = writable({ id: 0, snapName: '' });

db.activeProjectId.get().then((id) => {
  // console.log({ id });
  activeProject.set({ id, snapName: current });
});

export const activeProjectSnapNames = derived(
  activeProject,

  ($activeProject, set) => {
    if ($activeProject.id) {
      db.snapNames.get($activeProject.id).then((result) => {
        // console.log('get snapNames..');
        set(result);
      });
    } else {
      set([]);
    }
  },

  [current]
);
