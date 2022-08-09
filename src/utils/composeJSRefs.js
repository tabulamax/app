/** @param tables { import("../typings/types").Table[] } */
export function composeRefObjects(tables) {
  // prefix "_" = "aliased"
  const composedAliases = [];

  const composeUniqueAlias = (alias) => {
    if (composedAliases.includes(alias)) {
      return composeUniqueAlias(alias + 1);
    } else {
      composedAliases.push(alias);
      return alias;
    }
  };

  let tn = '';
  let atn = '';

  let atc = '';

  let exportz = '';
  let exportzAliases = '';

  let refs = '';
  let aliases = '';

  tables.forEach((table) => {
    const tName = table.name;

    let initAlias = tName
      .split('_')
      .map((n) => n[0].toLowerCase())
      .join('');

    const tAlias = composeUniqueAlias(initAlias);
    // console.log({ tAlias })
    aliases += `\n  ${tName}: "${tAlias}",`;

    exportz += `\n  ${tName},`;
    exportzAliases += `\n  ${tName} as ${tAlias},`;

    tn += `\n  ${tName}: "${tName}",`;
    atn += `\n  ${tName}: { [alias.${tName}]: tn.${tName} },`;
    atc += `\n  ${tName}: withAlias(${tName}, alias.${tName}),`;

    /* Table columns */
    const reducer = (acc, col) => acc + `\n\t${col.name}: "${col.name}",`;
    const props = table.columns.reduce(reducer, '');

    let columns = `\n\n/** @enum {string} ${tName.toUpperCase()} columns */`;
    columns += `\nconst ${tName} = {${props}\n}`;

    refs += columns;
  });

  const fileName = '\n/* tableReferences.js | dbReferences.js */';

  const myTableNames = `\n\n/** @enum {string} Table names */\nconst tn = {${tn}\n}`;

  const myAliasedTableNames = `\n\n/** @enum {object} Aliased table names */\nconst atn = {${atn}\n}`;

  const myAliases = `\n\n/* TODO: check correctness */\nconst alias = {${aliases}\n}`;

  const myAliasedTablesColumns = `\n\n/** @enum {object} Aliased tables columns */\nconst atc = {${atc}\n}`;

  const myExports = `\n\nexport {\n\ttn,\n\tatn,\n\tatc,\n${exportz}\n${exportzAliases}\n}`;

  const myFunc = `

/**
 * @template T
 * @param {T} table
 * @param {string} alias
 * @returns {{ [K in keyof T]: string; }}
 */
function withAlias(table, alias) {
  const t = {};
  Object.entries(table).forEach(([k, v]) => (t[k] = \`\${alias}.\${v}\`));
  // @ts-ignore
  return t;
}
  `;

  const code =
    fileName +
    myTableNames +
    myAliases +
    myAliasedTableNames +
    refs +
    myAliasedTablesColumns +
    myExports +
    myFunc;

  return code;
}
