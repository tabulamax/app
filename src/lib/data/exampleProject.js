import { DATATYPES_KNEX as DT } from "./constants"

/** @type { import("../typings/types").Table[] } */
const tables = [
  {
    id: 1637743543016,
    name: 'users',
    isDone: false,
    columns: [
      {
        key: 'PK',
        references: { tableId: null, onDelete: null },
        name: 'uuid',
        datatype: DT.uuid,
        nullable: null,
        unique: null
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'email',
        datatype: DT.string,
        nullable: false,
        unique: true
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'displayName',
        datatype: DT.string,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'photoURL',
        datatype: DT.string,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'moderator',
        datatype: DT.boolean,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'createdAt',
        datatype: DT.timestamp,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'updatedAt',
        datatype: DT.timestamp,
        nullable: true,
        unique: false
      }
    ]
  },
  null,
  null,
  {
    id: 1637744240467,
    name: 'comments',
    isDone: false,
    columns: [
      {
        key: 'PK',
        references: { tableId: null, onDelete: null },
        name: 'id',
        datatype: DT.identity,
        nullable: null,
        unique: null
      },
      {
        key: 'FK',
        references: { tableId: 1637743543016, onDelete: 'cascade' },
        name: 'submitter',
        datatype: DT.uuid,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'text',
        datatype: DT.text,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'createdAt',
        datatype: DT.timestamp,
        nullable: false,
        unique: false
      }
    ]
  },
  {
    id: 1637744455409,
    name: 'comment_replies',
    isDone: false,
    columns: [
      {
        key: 'PK',
        references: { tableId: 1637744240467, onDelete: 'cascade' },
        name: 'repliesTo',
        datatype: DT.integer,
        nullable: false,
        unique: false
      },
      {
        key: 'PK',
        references: { tableId: 1637744240467, onDelete: 'cascade' },
        name: 'reply',
        datatype: DT.integer,
        nullable: false,
        unique: false
      }
    ]
  },
  null,
  {
    id: 1637743830488,
    name: 'posts',
    isDone: false,
    columns: [
      {
        key: 'PK',
        references: { tableId: null, onDelete: null },
        name: 'id',
        datatype: DT.identity,
        nullable: null,
        unique: null
      },
      {
        key: 'FK',
        references: { tableId: 1637743543016, onDelete: 'cascade' },
        name: 'submitter',
        datatype: DT.uuid,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'title',
        datatype: DT.string,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'text',
        datatype: DT.text,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'meta',
        datatype: DT.jsonb,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'createdAt',
        datatype: DT.timestamp,
        nullable: false,
        unique: false
      },
      {
        key: '',
        references: { tableId: null, onDelete: null },
        name: 'updatedAt',
        datatype: DT.timestamp,
        nullable: true,
        unique: false
      }
    ]
  },
  {
    id: 1637744743248,
    name: 'post_comments',
    isDone: false,
    columns: [
      {
        key: 'PK',
        references: { tableId: 1637743830488, onDelete: 'cascade' },
        name: 'postId',
        datatype: DT.integer,
        nullable: false,
        unique: false
      },
      {
        key: 'PK',
        references: { tableId: 1637744240467, onDelete: 'cascade' },
        name: 'commentId',
        datatype: DT.integer,
        nullable: false,
        unique: false
      }
    ]
  },
  null
]

/** @type { import("../typings/types").Project } */
const project = { id: new Date().valueOf(), title: 'Example' };

/** @type { import("../typings/types").Snap } */
export const snap = {
  projectId: project.id,
  name: 'current',
  notes: 'Project notes go here ...',
  tables,
  createAt: new Date()
};

/** @type { import("../typings/types").Board } */
export const board = {
  ...project,
  tables,
  notes: snap.notes
};

/** @enum {object | array} */
export const starter = {
  font: { size: 16, family: 'Roboto' },
  projects: [project],
  board,
  snap
};
