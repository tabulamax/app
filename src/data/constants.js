// .mediumint() & .tinyint() - desable for now
// .timestamps() - not implemented

const DATATYPES_KNEX = {
  bigInteger: 'bigInteger',
  binary: 'binary',
  boolean: 'boolean',
  date: 'date',
  datetime: 'datetime',
  decimal: 'decimal',
  double: 'double',
  enum: 'enum',
  float: 'float',
  geography: 'geography',
  geometry: 'geometry',
  identity: 'identity',
  increments: 'increments',
  integer: 'integer',
  json: 'json',
  jsonb: 'jsonb',
  point: 'point',
  smallint: 'smallint',
  specific: 'specific',
  string: 'string',
  text: 'text',
  time: 'time',
  timestamp: 'timestamp',
  uuid: 'uuid'

  // mediumint: 'mediumint',
  // tinyint: 'tinyint',
};
Object.freeze(DATATYPES_KNEX);

const DATATYPES_POSTGRES = {
  bigInteger: 'BIGINT',
  binary: 'BYTEA',
  boolean: 'BOOLEAN',
  date: 'DATE',
  datetime: 'DATETIME',
  decimal: 'NUMERIC(8,2)',
  double: 'DOUBLE PRECISION',
  enum: '/* enum! */',
  float: 'REAL',
  geography: 'GEOGRAPHY',
  geometry: 'GEOMETRY',
  // identity: 'identity',
  increments: 'SERIAL',
  integer: 'INT',
  json: 'JSON',
  jsonb: 'JSONB',
  point: 'POINT',
  smallint: 'SMALLINT',
  specific: '/* specific! */',
  string: 'VARCHAR(255)',
  text: 'TEXT',
  time: 'TIME',
  timestamp: 'TIMESTAMPTZ',
  uuid: 'UUID'

  // mediumint: 'INT',
  // tinyint: 'SMALLINT',
};
Object.freeze(DATATYPES_POSTGRES);

const DATATYPES_SQLITE = {
  bigInteger: 'BIGINT',
  binary: 'BLOB',
  boolean: 'BOOLEAN',
  date: 'DATE',
  datetime: 'DATETIME',
  decimal: 'FLOAT',
  double: 'FLOAT',
  enum: '/* enum! */',
  float: 'FLOAT',
  geography: 'GEOGRAPHY',
  geometry: 'GEOMETRY',

  // identity: 'int', // ??
  increments: 'integer autoincrement',

  integer: 'INT',
  json: 'JSON',
  jsonb: 'JSON',
  point: 'POINT',
  smallint: 'INT',
  specific: '/* specific! */',
  string: 'VARCHAR(255)',
  text: 'TEXT',
  time: 'TIME',
  timestamp: 'DATETIME',
  uuid: 'VARCHAR(36)'
  // mediumint: 'INT',
  // tinyint: 'INT',
};
Object.freeze(DATATYPES_SQLITE);

const DATATYPES_2_DTS = {
  bigInteger: 'number',
  binary: 'any', // sqlite: BLOB | pg: BYTEA
  boolean: 'boolean',
  date: 'string',
  datetime: 'string',
  decimal: 'number',
  double: 'number',
  enum: 'any',
  float: 'string',
  geography: 'any',
  geometry: 'any',
  identity: 'number',
  increments: 'number',
  integer: 'number',
  json: 'string',
  jsonb: 'any',
  mediumint: 'number',
  point: 'any',
  specific: 'any',
  string: 'string',
  text: 'string',
  time: 'string',
  timestamp: 'string',
  uuid: 'string'

  // smallint: 'number',
  // tinyint: 'number',

  // for timestamps
  // created_at: 'string',
  // updated_at: 'string'
};
Object.freeze(DATATYPES_2_DTS);

const ACTIONS = {
  noAction: 'NO ACTION',
  cascade: 'CASCADE',
  restrict: 'RESTRICT',
  setNull: 'SET NULL',
  setDefault: 'SET DEFAULT'
};
Object.freeze(ACTIONS);

export { DATATYPES_POSTGRES, DATATYPES_KNEX, DATATYPES_SQLITE, DATATYPES_2_DTS, ACTIONS };
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
