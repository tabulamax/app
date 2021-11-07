function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/** @param tables { import("../typings/types").Table[] } */
export function composeDTypes(tables) {
  const EI = '\n\nexport interface';

  let create = '';

  tables.forEach((table) => {
    let entries = '';

    const tn = table.name
      .split('_')
      .map((el) => capitalizeFirstLetter(el))
      .join('');

    create += `${EI} ${tn} {`;

    table.columns.forEach((col) => {
      const nums = ['bigInteger', 'identity', 'increments', 'integer', 'float'];
      const strs = ['string', 'text', 'uuid', 'date', 'timestamp', 'enum'];

      const key = `${col.name}${col.nullable ? '?' : ''}`;
      let type;

      if (nums.includes(col.datatype)) {
        type = 'number';
      } else if (strs.includes(col.datatype)) {
        type = 'string';
      } else if (col.datatype == 'boolean') {
        type = 'boolean';
      } else {
        type = 'any';
      }

      entries += `\n  ${key}: ${type};`;
    });

    create += entries + '\n}';
  });

  const code = create;

  return code;
}
