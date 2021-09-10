import { composeRefObjects } from './composeJSRefs';
import { composeKnexMigrations } from './composeKnexMigrations';
import { composeCreateAndDropTablesSQL } from './composeCreateAndDropSQL';

import { board } from '../store/projects';
import { get } from 'svelte/store';

/** @param {string} ctx */
export const generateCode = (ctx) => {
  const tables = get(board).tables.filter(Boolean);
  // console.log({ tables })

  let code = '';

  switch (ctx) {
    case 'js:refs':
      code = composeRefObjects(tables);
      break;

    case 'js:knex':
      code = composeKnexMigrations(tables);
      break;

    case 'sql':
      code = composeCreateAndDropTablesSQL(tables);
      break;

    default:
      console.error('Wrong Key!');
      break;
  }

  return code;
};
