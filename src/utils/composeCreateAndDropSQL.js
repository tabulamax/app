import { ACTIONS, DATATYPES_POSTGRES, DATATYPES_SQLITE } from '../data/constants';

/**
 * @param {import("../typings/types").Table[]} tables
 * @param {string} dialect
 */
export function composeCreateAndDropTablesSQL(tables, dialect) {
  const DB = dialect === 'sqlite' ? DATATYPES_SQLITE : DATATYPES_POSTGRES;

  const CT = '\n\nCREATE TABLE';
  const DT = '\n\nDROP TABLE IF EXISTS';

  let create = '';
  let drop = '';

  tables.forEach((table) => {
    drop = `${DT} ${table.name};` + drop;

    create += `${CT} ${table.name} (`;

    let entries = '';
    let foreigns = '';
    const primaryKeys = [];

    table.columns.forEach((col) => {
      let entry = '';

      entry += `\n  ${col.name} ${DB[col.datatype]}`;

      if (col.key === 'PK') {
        primaryKeys.push(col.name);
      } else {
        if (col.unique === true) entry += ' UNIQUE';

        if (col.nullable === false) entry += ' NOT NULL';
      }

      if (col.references?.tableId) {
        const refTable = tables.find((t) => t.id == col.references.tableId);

        const refTablePKCols = refTable.columns.filter((c) => c.key == 'PK');
        // console.log({ refTablePKCols })
        const refColName = refTablePKCols.length == 1 ? refTablePKCols[0].name : '/* column */';

        foreigns += `\n  FOREIGN KEY (${col.name})`;
        foreigns += ` REFERENCES ${refTable.name} (${refColName})`;

        if (col.references.onDelete != 'noAction') {
          foreigns += ` ON DELETE ${ACTIONS[col.references.onDelete]}`;
        }

        foreigns += ',';
      }

      entries += entry + ',';
    });

    const primaries = `\n  PRIMARY KEY (${primaryKeys.join(',')}),`;

    create += entries + primaries + foreigns;
    create = create.slice(0, -1); // remove last comma ","
    // console.log(create);
    create += '\n);';
  });

  const code = `\n/* ${dialect} */\n\n/* CREATE */` + create + '\n\n\n/* DROP */' + drop;

  return code;
}
