import { DATATYPES_POSTGRES } from '../data/constants';
// example from https://mermaid-js.github.io/mermaid/#/./entityRelationshipDiagram
// let input = `erDiagram
//     CAR ||--o{ NAMED-DRIVER : allows
//     CAR {
//         string registrationNumber
//         string make
//         string model
//     }
//     PERSON ||--o{ NAMED-DRIVER : is
//     PERSON {
//         string firstName
//         string lastName
//         int age
//     }
// `;
//
const one2one = '||--o|';
const one2many = '||--o{';
// const one2one = '||--||';
// const one2many = '||--|{';

const DT = {
  ...DATATYPES_POSTGRES,

  enum: 'enum',
  specific: 'specific',
  string: 'VARCHAR',
  decimal: 'NUMERIC',
  identity: 'INT'
};

// console.log({ DT });

/** @param {import("../typings/types").Table[]} tables */
export function composeMermaidERD(tables) {
  let lines = '';
  let boxes = '';

  tables.forEach((table) => {
    let entries = '';
    let relationships = '';

    table.columns.forEach((col) => {
      const _type = DT[col.datatype];
      entries += `\t${col.name} ${_type} ${col.key}\n`;

      if (col.references?.tableId) {
        const refTable = tables.find((t) => t.id === col.references.tableId);
        let rel = one2many;

        if (col.key === 'PK') {
          const pKeys = table.columns.reduce((prev, curr) => {
            return curr.key === 'PK' ? prev + 1 : prev;
          }, 0);

          if (pKeys < 2) {
            rel = one2one;
          }
        }

        relationships += `\n${refTable.name} ${rel} ${table.name} : ""`;
      }
    });

    boxes += `\n${table.name} {\n${entries}\n}`;
    lines += relationships;
  });

  const code = `erDiagram
  ${boxes}
  ${lines}
  `;
  // console.log(code);

  return code;
}
