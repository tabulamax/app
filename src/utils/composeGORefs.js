import { capitalizeAll, capitalizeFirstLetter } from './strings.js';

/** @param tables { import("../typings/types").Table[] } */
export function composeGORefs(tables) {
  let code = '';

  tables.forEach((table) => {
    const tn = table.name;
    const TN = capitalizeAll(tn);

    let s = `\ntype ${tn} struct {`;
    let v = `\nvar ${TN} = ${tn}{`;

    table.columns.forEach((col) => {
      const f = col.name;
      const F = capitalizeFirstLetter(col.name);

      s += `\n  ${F} string`;
      v += `\n  ${F}: "${f}",`;
    });

    s += '\n}';
    v += '\n}';

    code += s + v + '\n';
  });

  return code;
}
