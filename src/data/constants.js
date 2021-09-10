/* compose knex */
export const DATATYPES_KNEX = {
  bigInteger: 'bigInt',
  boolean: 'boolean',
  date: 'date',
  enum: 'enum',
  float: 'float',
  identity: 'identity',
  increments: 'increments',
  integer: 'integer',
  jsonb: 'jsonb',
  specific: 'specific',
  string: 'string',
  text: 'text',
  timestamp: 'timestamp',
  uuid: 'uuid'
};

/* compose SQL */
export const DATATYPES_POSTGRES = {
  bigInteger: 'BIGINT',
  boolean: 'BOOLEAN',
  date: 'DATE',
  // enum: 'enum',
  float: 'NUMERIC(8,2)',
  // increments: 'SERIAL',
  integer: 'INT',
  jsonb: 'JSONB',
  // specific: 'specific',
  string: 'VARCHAR(255)',
  text: 'TEXT',
  timestamp: 'TIMESTAMPTZ',
  uuid: 'UUID'
};

export const ACTIONS = {
  noAction: 'NO ACTION',
  cascade: 'CASCADE',
  restrict: 'RESTRICT',
  setNull: 'SET NULL',
  setDefault: 'SET DEFAULT'
};

// export const actions = {
//   noAction: 'noAction',
//   cascade: 'cascade',
//   restrict: 'restrict',
//   setNull: 'setNull',
//   setDefault: 'setDefault'
// };

export const FONT = {
  sizes: [10, 12, 14, 16, 18, 20, 24, 28],
  families: ['Default', 'Roboto', 'Syne']
};

export const KEYS = ['', 'PK', 'FK'];
export const KEYS_EMOJI = new Map([
  ['PK', '🔒'],
  ['FK', '🔑'],
  ['PFK', '🔐'],
  ['', '']
]);

/** @type { import("../typings/types").Table[] } */
const tables = [
  {
    id: 2,
    isDone: true,
    name: 'users',
    columns: [
      {
        key: 'PK',
        name: 'ID',
        datatype: DATATYPES_KNEX.uuid,
        nullable: null,
        unique: null
      },
      {
        key: '',
        name: 'email',
        datatype: DATATYPES_KNEX.string,
        nullable: false,
        unique: true
      },
      {
        key: '',
        name: 'displayName',
        datatype: DATATYPES_KNEX.string,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'admin',
        datatype: DATATYPES_KNEX.boolean,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'disabled',
        datatype: DATATYPES_KNEX.boolean,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'createdAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: false,
        unique: false
      }
    ]
  },
  {
    id: 5,
    isDone: false,
    name: 'user_preferences',
    columns: [
      {
        key: 'PK',
        name: 'userID',
        references: { tableId: 2, onDelete: 'cascade' },
        datatype: DATATYPES_KNEX.uuid,
        nullable: null,
        unique: null
      },
      {
        key: '',
        name: 'theme',
        datatype: DATATYPES_KNEX.enum,
        nullable: false,
        unique: false
      }
    ]
  },
  {
    id: 3,
    isDone: false,
    name: 'posts',
    columns: [
      {
        key: 'PK',
        name: 'ID',
        datatype: DATATYPES_KNEX.identity,
        nullable: null,
        unique: null
      },
      {
        key: 'FK',
        references: { tableId: 2, onDelete: 'noAction' },
        name: 'authorID',
        datatype: DATATYPES_KNEX.uuid,
        nullable: null,
        unique: null
      },
      {
        key: '',
        name: 'title',
        datatype: DATATYPES_KNEX.string,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'body',
        datatype: DATATYPES_KNEX.text,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'createdAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'updatedAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'removedAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: true,
        unique: false
      }
    ]
  },
  {
    id: 4,
    isDone: false,
    name: 'comments',
    columns: [
      {
        key: 'PK',
        name: 'ID',
        datatype: DATATYPES_KNEX.identity,
        nullable: null,
        unique: null
      },
      {
        key: 'FK',
        references: { tableId: 2, onDelete: 'noAction' },
        name: 'authorID',
        datatype: DATATYPES_KNEX.uuid,
        nullable: null,
        unique: null
      },
      {
        key: 'FK',
        references: { tableId: 3, onDelete: 'cascade' },
        name: 'postId',
        datatype: DATATYPES_KNEX.integer,
        nullable: null,
        unique: null
      },
      {
        key: '',
        name: 'body',
        datatype: DATATYPES_KNEX.text,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'createdAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: false,
        unique: false
      },
      {
        key: '',
        name: 'removedAt',
        datatype: DATATYPES_KNEX.timestamp,
        nullable: true,
        unique: false
      }
    ]
  },
  null
];

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
  // snapName: snap.name,
  // snapNames: [snap.name]
};

/** @enum {object | array} */
export const starter = {
  font: { size: 16, family: 'Roboto' },
  projects: [project],
  board,
  snap
};
