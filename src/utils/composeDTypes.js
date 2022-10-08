import { DATATYPES_2_DTS } from '../data/constants';
import { capitalizeAll } from './strings.js';

/** @param tables { import("../typings/types").Table[] } */
export function composeDTypes(tables) {
  const ei = '\nexport interface';

  let code = '';

  tables.forEach((table) => {
    const entries = table.columns.reduce((acc, col) => {
      const key = `${col.name}${col.nullable ? '?' : ''}`;
      const type = DATATYPES_2_DTS[col.datatype];

      return acc + `\n\t${key}: ${type}${col.nullable ? ' | null' : ''};`;
    }, '');

    const TN = capitalizeAll(table.name);
    code += `${ei} I${TN} { ${entries} \n}\n`;
  });

  return code;
}
