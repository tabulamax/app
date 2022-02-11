import { DATATYPES_2_DTS } from '../data/constants';

/** @param {string} string */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/** @param tables { import("../typings/types").Table[] } */
export function composeDTypes(tables) {
  const EI = '\nexport interface';

  let create = '';

  tables.forEach((table) => {
    let entries = '';

    const tn = table.name
      .split('_')
      .map((el) => capitalizeFirstLetter(el))
      .join('');

    create += `${EI} ${tn} {`;

    table.columns.forEach((col) => {
      const key = `${col.name}${col.nullable ? '?' : ''}`;
      const type = DATATYPES_2_DTS[col.datatype];

      entries += `\n  ${key}: ${type};`;
    });

    create += entries + '\n}';
  });

  const code = create;

  return code;
}
