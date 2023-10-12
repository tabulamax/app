import { DATATYPES_2_GO } from '../data/constants';
import { capitalizeAll, capitalizeFirstLetter } from './strings.js';

/** @param tables { import("../typings/types").Table[] } */
export function composeGOTypes(tables) {
  let code = '';

  tables.forEach((table) => {
    const entries = table.columns.reduce((acc, col) => {
      const key = capitalizeFirstLetter(col.name);
      const pre = col.nullable ? '*' : '';
      const type = pre + DATATYPES_2_GO[col.datatype];
      const json = `json:"${col.name},omitempty"`;

      return acc + `\n  ${key} ${type} \`${json}\` `;
    }, '');

    const TN = capitalizeAll(table.name);
    code += `\ntype ${TN} struct { ${entries} \n}\n`;
  });

  return code;
}
