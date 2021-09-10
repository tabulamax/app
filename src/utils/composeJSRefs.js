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
  let _tn = '';

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
    aliases += `\n  ${tName}: '${tAlias}',`;

    exportz += `\n  ${tName},\n  _${tName},`;
    exportzAliases += `\n  ${tName} as ${tAlias},\n  _${tName} as _${tAlias},`;

    tn += `\n  ${tName}: '${tName}',`;
    _tn += `\n  ${tName}: { [alias.${tName}]: tn.${tName} },`;

    /* Table columns */
    const reducer = (acc, col) => acc + `\n\t${col.name}: '${col.name}',`;
    const props = table.columns.reduce(reducer, '');

    let columns = `\n\n/** @enum {string} ${tName.toUpperCase()} columns */`;
    columns += `\nconst ${tName} = {${props}\n}`;

    const _tName = '_' + tName;

    let _columns = `\n\n/** @enum {string} ${tName.toUpperCase()} aliased columns */`;

    _columns += `\nconst ${_tName} = { ...${tName} }`;
    _columns += `\nObject.entries(${_tName}).forEach(([key, val]) => {`;
    _columns += `\n  ${_tName}[key] = \`\${alias.${tName}}.\${val}\``;
    _columns += `\n})`;

    refs += columns + _columns;
  });

  const fileName = '/* tableReferences.js | dbReferences.js */';

  const tableNames = `\n\n/** @enum {string} Table names */\nconst tn = {${tn}\n}`;

  const $tableNames = `\n\n/** @enum {object} Aliased table names */\nconst _tn = {${_tn}\n}`;

  const alias = `\n\n/* TODO: check correctness */\nconst alias = {${aliases}\n}`;

  const exportRefs = `\n\nexport {\n\ttn,\n\t_tn,${exportz}\n${exportzAliases}\n}`;

  const code = fileName + tableNames + alias + $tableNames + refs + exportRefs;

  return code;
}
