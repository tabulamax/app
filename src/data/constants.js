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
  json: 'json',
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
  json: 'JSON',
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
