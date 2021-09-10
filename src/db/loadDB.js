import db from './db';
import { starter } from '../data/constants';

/** @type { import("../typings/types").Workspace } */
let ws;
/** @type { import("../typings/types").Board } */
let board;

const init = { ws, board };
// db.myDB.clear();

export async function load() {
  try {
    let activeProjectId = await db.activeProjectId.get();
    // console.log({ activeProjectId })

    /** @type { import("../typings/types").Board } */
    let board;
    /** @type { import("../typings/types").Project[] } */
    let projects = [];

    if (activeProjectId === 0) {
      board = starter.board;
    } else if (activeProjectId >= 1) {
      projects = await db.projects.get();

      const snap = await db.snap.get(activeProjectId);
      const { tables, notes, name } = snap;

      const { title } = projects.find((p) => p.id === activeProjectId);

      board = { tables, notes, title };
    } else {
      activeProjectId = starter.projects[0].id;
      projects = starter.projects;
      board = starter.board;

      await Promise.all([
        db.activeProjectId.set(projects[0].id),
        db.projects.add(projects[0]),
        db.snap.set(starter.snap),
        db.snapNames.add(starter.snap.projectId, starter.snap.name)
      ]);
    }

    init.ws = {
      loaded: true,
      projects
    };

    init.board = board;

    // console.log({ home: init })
  } catch (error) {
    console.error(error);
  }

  return init;
}
