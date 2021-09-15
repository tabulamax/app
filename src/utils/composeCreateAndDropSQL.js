import { ACTIONS, DATATYPES_KNEX, DATATYPES_POSTGRES } from '../data/constants';

/** @param tables { import("../typings/types").Table[] } */
export function composeCreateAndDropTablesSQL(tables) {
  const CT = '\n\nCREATE TABLE';
  const DT = '\n\nDROP TABLE IF EXISTS';
  const IDENTITY = 'INT GENERATED ALWAYS AS IDENTITY';

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

      switch (col.datatype) {
        case DATATYPES_KNEX.identity:
          entry += `\n  ${col.name} ${IDENTITY}`;
          break;

        case DATATYPES_KNEX.enum:
          entry += `\n  ${col.name} /* enum */`;
          break;

        case DATATYPES_KNEX.specific:
          entry += `\n  ${col.name} /* specific type */`;
          break;

        case DATATYPES_KNEX.increments:
          entry += `\n  ${col.name} SERIAL`;
          break;

        default:
          entry += `\n  ${col.name} ${DATATYPES_POSTGRES[col.datatype]}`;
          break;
      }

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

    create += entries + primaries + foreigns + '\n);';
  });

  const code = '/* PostgreSQL */\n\n/* CREATE */' + create + '\n\n\n/* DROP */' + drop;

  return code;
}