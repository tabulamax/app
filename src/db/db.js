import { get, set, update, del, values, createStore } from 'idb-keyval';

/** @typedef { import("../typings/types").Font } Font */
/** @typedef { import("../typings/types").Snap } Snap */
/** @typedef { import("../typings/types").Project } Project */

/** @enum {function} */
const store = {
  snaps: createStore('snaps', 'snaps'),
  home: createStore('home', 'home')
};

/** @enum {string} */
const n = {
  // db:home
  font: 'font',
  activeProjectId: 'workspace_active_project_id',
  projects: 'my_projects',
  snapNamesOf: 'snap_names_of', // snaps_of_ProjectID

  // db:snaps
  snap: 'snap' // snap_SnapName_ProjectID
};

/* FONT */

/** @return { Promise<Font> } */
const getFont = () => get(n.font, store.home);
/** @param { Font } font */
const setFont = (font) => set(n.font, font, store.home);

/** @enum {function} */
const font = {
  get: getFont,
  set: setFont
};

/* FONT */

/* ACTIVE PROJECT ID */

/** @return { Promise<number> } */
const getActiveProjectId = () => get(n.activeProjectId, store.home);

/** @param { number } id */
const setActiveProjectId = (id) => set(n.activeProjectId, id, store.home);

/** @enum {function} */
const activeProjectId = {
  get: getActiveProjectId,
  set: setActiveProjectId
};

/* ACTIVE PROJECT ID */

/* PROJECTS */
/** @return { Promise<Project[]> } */
const getProjects = () => get(n.projects, store.home);

/** @param { Project } project */
const addToProjects = (project) => {
  /** @param {Project[]} pjs */
  const updater = (pjs = []) => [...pjs, project];

  return update(n.projects, updater, store.home);
};

/** @param { Project[] } project */
const addManyProjects = (project) => {
  /** @param {Project[]} pjs */
  const updater = (pjs = []) => [...pjs, ...project];

  return update(n.projects, updater, store.home);
};

/** @param { Project } project */
const updateProjectTitle = (project) => {
  /** @param {Project[]} pjs */
  const updater = (pjs = []) => {
    const head = pjs.find(({ id }) => id === project.id);
    head.title = project.title;
    return pjs;
  };

  return update(n.projects, updater, store.home);
};

/** @param { number } projectId */
const deleteProject = (projectId) => {
  /** @param {Project[]} pjs */
  const updater = (pjs = []) => pjs.filter(({ id }) => id !== projectId);

  return update(n.projects, updater, store.home);
};

/** @enum {function} */
const projects = {
  get: getProjects,
  add: addToProjects,
  addMany: addManyProjects,
  update: updateProjectTitle,
  del: deleteProject
};
/* PROJECTS */

/* SNAP NAMES */

/**
 * @return { Promise<string[]> }
 * @param {number} projectId
 */
const getSnapNames = (projectId) => {
  const key = `${n.snapNamesOf}_${projectId}`;

  return get(key, store.home);
};

/**
 * @param {number} projectId
 * @param {string} snapName
 */
const addSnapName = (projectId, snapName) => {
  const key = `${n.snapNamesOf}_${projectId}`;
  /** @param {string[]} names */
  const updater = (names = []) => {
    if (names.length) {
      const [current, ...rest] = names;

      return [current, snapName, ...rest];
    } else {
      // should be current'
      return [snapName];
    }
  };

  return update(key, updater, store.home);
};

/**
 * @param {number} projectId
 * @param {string[]} snapNames
 */
const setSnapNames = (projectId, snapNames) => {
  // console.log({ projectId: snapNames })
  const key = `${n.snapNamesOf}_${projectId}`;

  return set(key, snapNames, store.home);
};

/**
 * @param {number} projectId
 * @param {string} snapName
 */
const deleteSnapName = (projectId, snapName) => {
  const key = `${n.snapNamesOf}_${projectId}`;
  /** @param {string[]} names */
  const updater = (names = []) => names.filter((n) => n !== snapName);

  return update(key, updater, store.home);
};

/** @param {number} projectId */
const deleteAllSnapName = (projectId) => {
  const key = `${n.snapNamesOf}_${projectId}`;

  return del(key, store.home);
};

/** @enum {function} */
const snapNames = {
  set: setSnapNames,
  get: getSnapNames,
  add: addSnapName,
  del: deleteSnapName,
  delAll: deleteAllSnapName
};

/* SNAP NAMES */

/* SNAPS */

/**
 * @return { Promise<Snap> }
 * @param {string} snapName
 * @param {number} projectId
 */
const getSnap = (projectId, snapName = 'current') => {
  const key = `${projectId}_${snapName}`;

  return get(key, store.snaps);
};

/** @return { Promise<Snap[]>} */
// @ts-ignore
const getAllSnaps = () => values(store.snaps);

/** @param {Snap} snap */
const setSnap = (snap) => {
  const key = `${snap.projectId}_${snap.name}`;

  return set(key, snap, store.snaps);
};

/**
 * @param {number} projectId
 * @param {string} snapName
 * @param {Partial<Snap>} fieldsToUpdate
 */
const updateSnap = (projectId, snapName, fieldsToUpdate) => {
  const key = `${projectId}_${snapName}`;

  /** @param {Snap} snap */
  const updater = (snap) => {
    // console.log({ oldSnap: snap })
    /** @type {Snap} */
    const newSnap = { ...snap, ...fieldsToUpdate };
    // console.log({ newSnap })

    return newSnap;
  };

  return update(key, updater, store.snaps);
};

/**
 * @param {string} snapName
 * @param {number} projectId
 */
const deleteSnap = (projectId, snapName) => {
  const key = `${projectId}_${snapName}`;

  return del(key, store.snaps);
};

/** @enum {function} */
const snap = {
  get: getSnap,
  getAll: getAllSnaps,
  set: setSnap,
  del: deleteSnap,
  update: updateSnap
};

/* SNAPS */

const db = { font, activeProjectId, projects, snapNames, snap };

// import { clear } from 'idb-keyval';
// const clearDB = () => {
//   clear(store.home);
//   clear(store.snaps);
// };
// /** @enum {function} */
// const myDB = { clear: clearDB };
// db.myDB = myDB;

export default db;
