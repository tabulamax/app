import { DATATYPES_KNEX, ACTIONS } from '../data/constants';

/** @param {import("../typings/types").Table[]} tables  */
export function composeKnexMigrations(tables) {
  const IDENTITY = "\n\nconst IDENTITY = 'INT GENERATED ALWAYS AS IDENTITY'";

  const paramKnex = "\n\n/** @param {import('knex').Knex} knex */";

  let identity = '';
  let refs = '';

  let up = '';
  let down = '';

  tables.forEach((table) => {
    refs += `\n  ${table.name},`;

    down = `\n  await knex.schema.dropTableIfExists(tn.${table.name})` + down;

    let entries = '';

    let primaryKeys = [];

    table.columns.forEach((col) => {
      switch (col.datatype) {
        case DATATYPES_KNEX.identity:
          entries += `\n\t  t.specificType(${table.name}.${col.name}, IDENTITY)`;
          identity = IDENTITY;
          break;

        case DATATYPES_KNEX.enum:
          entries += `\n\t  t.enum(${table.name}.${col.name}, /* [...values] */)`;
          break;

        case DATATYPES_KNEX.specific:
          entries += `\n\t  t.specificType(${table.name}.${col.name}, /* type */)`;
          break;

        case DATATYPES_KNEX.increments:
          entries += `\n\t  t.increments(${table.name}.${col.name}, { primaryKey: false })`;
          break;

        default:
          entries += `\n\t  t.${col.datatype}(${table.name}.${col.name})`;
          break;
      }

      if (col.unique === true) entries += '.unique()';

      if (col.nullable === false) entries += '.notNullable()';

      if (col.key === 'PK') primaryKeys.push(`${table.name}.${col.name}`);

      if (col.references?.tableId) {
        const refTable = tables.find((t) => t.id === col.references.tableId);

        const refTablePKCols = refTable.columns.filter((c) => c.key === 'PK');
        // console.log(toRaw(refTablePKCols[0]))
        const refColName = refTablePKCols.length === 1 ? refTablePKCols[0].name : '/* column */';

        entries += `.references(${refTable.name}.${refColName})`;
        entries += `.inTable(tn.${refTable.name})`;

        if (col.references.onDelete !== 'noAction') {
          entries += `.onDelete('${ACTIONS[col.references.onDelete]}')`;
        }
      }
    });

    entries += `\n\n\t  t.primary([${primaryKeys.join(', ')}])`;

    up += `\n\n  await knex.schema.createTable(tn.${table.name}, (t) => {${entries}\n\t})`;
  });

  const knexUp = `${paramKnex}\nexport async function up(knex) {${up}\n}`;

  const knexDown = `${paramKnex}\nexport async function down(knex) {${down}\n}`;

  const importRefs = `/* TODO: fix import */\nimport { \n  tn,${refs}\n} from '#data/tableReferences.js'`;

  const code = importRefs + identity + knexUp + knexDown;
  // console.log(text)
  return code;
}
