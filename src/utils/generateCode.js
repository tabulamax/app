import { composeCreateAndDropTablesSQL } from './composeCreateAndDropSQL';
import { composeDTypes } from './composeDTypes';
import { composeGOTypes } from './composeGOTypes.js';
import { composeRefObjects } from './composeJSRefs';
import { composeKnexMigrations } from './composeKnexMigrations';

import { get } from 'svelte/store';
import { board } from '../store/projects';
import { composeMermaidERD } from './composeMermaidERD';
import { composeGORefs } from './composeGORefs.js';

/** @typedef {import("../typings/types").Tech} Tech*/

/** @param {Tech} ctx */
export const generateCode = (ctx) => {
  const tables = get(board).tables.filter(Boolean);
  // console.log({ tables })

  let code = '';

  switch (ctx) {
    case 'js: references':
      code = composeRefObjects(tables);
      break;

    case 'js: knex':
      code = composeKnexMigrations(tables);
      break;

    case 'js: d.ts':
      code = composeDTypes(tables);
      break;

    case 'go: types':
      code = composeGOTypes(tables);
      break;

    case 'go: references':
      code = composeGORefs(tables);
      break;

    case 'sql: postgres':
      code = composeCreateAndDropTablesSQL(tables, 'postgres');
      break;

    case 'sql: sqlite3':
      code = composeCreateAndDropTablesSQL(tables, 'sqlite');
      break;

    case 'erd':
      code = composeMermaidERD(tables);
      break;

    default:
      code = 'Error';
      console.error('Wrong Key!');
      break;
  }

  return code;
};
