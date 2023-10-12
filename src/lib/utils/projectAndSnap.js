import { get } from 'svelte/store';
import { board, ws } from '../store/projects';
import { activeProject, activeProjectSnapNames } from '../store/active';
import db from '../db/db';

const current = 'current';

/**
 * @param {string} title
 * @param {string} notes
 */
export async function createProject(title, notes) {
  const id = new Date().valueOf();
  // console.log('createProject ', id)

  /** @type { import("../typings/types").Snap } */
  const snap = {
    projectId: id,
    name: current,
    notes,
    tables: [null],
    createAt: new Date()
  };

  await Promise.all([
    db.activeProjectId.set(id),
    db.projects.add({ id, title }),
    db.snap.set(snap),
    db.snapNames.add(snap.projectId, snap.name)
  ]);

  ws.update((v) => {
    v.projects.push({ id, title });
    return v;
  });

  activeProject.set({ id, snapName: current });

  /** @type { import("../typings/types").Board } */
  const b = {
    title: title,
    notes: notes,
    tables: snap.tables
  };

  board.set(b);
}

export async function deleteProject() {
  const { id } = get(activeProject);

  await Promise.all([
    db.projects.del(id),
    db.snapNames.delAll(id),
    get(activeProjectSnapNames).map((name) => db.snap.del(id, name))
  ]);

  /** @type { import("../typings/types").Project[] } */
  let projects;

  ws.update((v) => {
    projects = v.projects.filter((p) => p.id !== id);
    return { ...v, projects };
  });

  const newId = projects[0]?.id || 0;
  // console.log({ newId });
  await db.activeProjectId.set(newId);

  activeProject.set({ id: newId, snapName: current });
}

/**
 * @param {string} name
 * @param {string} notes
 */
export async function createSnap(name, notes) {
  const _board = get(board);
  const { id } = get(activeProject);

  /** @type { import("../typings/types").Snap } */
  const snap = {
    projectId: id,
    name,
    notes,
    tables: _board.tables,
    createAt: new Date()
  };

  await Promise.all([db.snap.set(snap), db.snapNames.add(id, name)]);

  board.update((v) => ({ ...v, notes, tables: snap.tables }));

  activeProject.set({ id, snapName: name });
}

export async function deleteSnap() {
  const { id, snapName } = get(activeProject);

  await db.snap.del(id, snapName);
  await db.snapNames.del(id, snapName);

  activeProject.set({ id, snapName: current });
}
