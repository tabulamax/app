export interface Workspace {
  loaded: boolean;
  projects: Project[];
}

export interface Project {
  id: number;
  title: string;
  // createAt: Date;
}

export interface Board {
  title: string;
  notes: string;
  tables: Array<Table | null>;
}

export interface Snap {
  projectId: number;
  name: string;
  notes: string;
  tables: Array<Table | null>;
  createAt: Date;
}

export interface Table {
  id: number;
  name: string;
  isDone: boolean;
  columns: Column[];
}

export interface Column {
  key: string;
  references?: Reference;
  name: string;
  datatype: string;
  nullable: boolean | null;
  unique: boolean | null;
}

export interface Reference {
  tableId: number;
  column?: string;
  onDelete: string;
}

export interface Font {
  size: number;
  family: string;
}

/*  */
export type MyIcon =
  | 'post_add'
  | 'content_copy'
  | 'code'
  | 'grid_view'
  | 'edit'
  | 'done_all'
  | 'remove_done'
  | 'delete_forever'
  | 'key';

export type Tech =
  | 'erd'
  | 'js: knex'
  | 'js: references'
  | 'js: d.ts'
  | 'sql: postgres'
  | 'sql: sqlite3';

export interface Datatypes {
  bigInteger: string;
  binary: string;
  boolean: string;
  date: string;
  datetime: string;
  decimal: string;
  double: string;
  enum: string;
  float: string;
  geography: string;
  geometry: string;
  identity: string;
  increments: string;
  integer: string;
  json: string;
  jsonb: string;
  point: string;
  smallint: string;
  specific: string;
  string: string;
  text: string;
  time: string;
  timestamp: string;
  uuid: string;
}
