<script>
  import { Btn, Modal, Icon } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import Table from './Table.svelte';
  import ManageTable from './ManageTable.svelte';

  import { board, showOnlyKeys } from '../store/projects';
  import { activeProject } from '../store/active';
  import db from '../db/db';

  let boxIdx = null;

  /** @type {import("../typings/types").Table[]}*/
  let computedTables;

  $: {
    if (!$showOnlyKeys) {
      // console.log(board.tables)
      computedTables = $board.tables;
    } else {
      const tablesOnlyWithKeys = $board.tables.map((table) => {
        if (table == null) {
          return null;
        }

        const { name, columns, isDone, id } = table;

        return { id, name, isDone, columns: columns.filter((c) => !!c.key) };
      });

      computedTables = tablesOnlyWithKeys;
    }
  }

  const onRearrangeColumns = (event) => {
    const { tableName, movedElemIdx, idxToMoveTo } = event.detail;
    // console.log({ tableName, movedElemIdx, idxToMoveTo });
    const tableIdx = $board.tables.findIndex((c) => c?.name == tableName);

    const [col] = $board.tables[tableIdx].columns.splice(movedElemIdx, 1);

    $board.tables[tableIdx].columns.splice(idxToMoveTo, 0, col);
    $board.tables = $board.tables;
  };

  const onDeleteTable = (i) => {
    $board.tables.splice(i, 1);
    $board.tables = $board.tables;

    db.snap.update($activeProject.id, $activeProject.snapName, { tables: $board.tables });
  };

  /* Drag & Drop Tables */
  let tableMovedFromBoxIdx;

  const onDragTable = (tableId) => {
    // console.log({ tableId })
    tableMovedFromBoxIdx = tableId;
  };

  const onDropTable = (dropBoxIdx) => {
    // console.log({ dropBoxIdx })
    const tempTable = $board.tables[tableMovedFromBoxIdx];
    // console.log(tempTable)
    $board.tables[tableMovedFromBoxIdx] = null;
    $board.tables[dropBoxIdx] = tempTable;
    tableMovedFromBoxIdx = null;
  };

  const onDragTableEnter = (ev) => {
    // console.log('onDragTableEnter')
    // console.log(ev.target)
    if (tableMovedFromBoxIdx !== null) ev.target.classList?.add('over');
  };

  const onDragTableLeave = (ev) => {
    // console.log('onDragTableLeave')
    // console.log(ev.target)
    if (tableMovedFromBoxIdx !== null) ev.target.classList?.remove('over');
  };

  /** @type {HTMLElement} */
  let grid;
  function onClose() {
    // console.log({ boxIdx });
    /* TAB navigation */
    // @ts-ignore
    let el = grid.childNodes[boxIdx]?.firstChild?.querySelector('.btn');
    el && el.focus();
    // console.log(el);
    boxIdx = null;
  }
</script>

{#if boxIdx !== null}
  <Modal on:close={onClose}>
    <ManageTable idx={boxIdx} on:close={onClose} />
  </Modal>
{/if}

<section id="table-grid" bind:this={grid}>
  {#each computedTables as item, i (i)}
    <div>
      {#if item}
        <Table
          table={item}
          editable={$activeProject.snapName == 'current'}
          on:rearrange={onRearrangeColumns}
          on:drag-table={() => onDragTable(i)}
          on:edit={() => (boxIdx = i)}
          on:delete={() => onDeleteTable(i)}
        />
      {:else}
        <div
          class="dropzone fsa"
          on:dragenter={onDragTableEnter}
          on:dragleave={onDragTableLeave}
          on:drop|preventDefault={() => onDropTable(i)}
          on:dragover|preventDefault={() => false}
        >
          <Btn
            on:click={() => (boxIdx = i)}
            iconOnly
            accent="alpha"
            colored
            disabled={$activeProject.snapName !== 'current'}
          >
            <MyIcon name="post_add" />
          </Btn>

          <Btn
            on:click={() => {
              $board.tables.splice(i, 0, null);
              $board.tables = $board.tables;
            }}
            iconOnly
            accent="beta"
            colored
          >
            <Icon name="add" />
          </Btn>

          <Btn
            on:click={() => {
              $board.tables.splice(i, 1);
              $board.tables = $board.tables;
            }}
            iconOnly
            accent="danger"
            colored
          >
            <Icon name="remove" />
          </Btn>
        </div>
      {/if}
    </div>
  {/each}

  <div>
    <div class="dropzone fce">
      <Btn
        on:click={() => ($board.tables = [...$board.tables, null])}
        iconOnly
        accent="beta"
        colored
      >
        <Icon name="add" />
      </Btn>
    </div>
  </div>
</section>

<style>
  #table-grid {
    /* min-height: calc(100vh - 6rem - 1.2em - 4px - 1.7em); */
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--min-table-width), 1fr));
    grid-auto-rows: min-content;
    gap: 2em;

    /* background-color: rgba(127, 255, 212, 0.37); */
  }

  #table-grid > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  #table-grid > div > * {
    flex: 1 1 100%;
    max-width: var(--max-table-width);
  }

  .dropzone {
    max-width: var(--max-table-width);
    padding: 1em 1.5em;
    box-shadow: 0 0 0.75em -0.3em inset var(--text-alpha);
  }

  .dropzone > :global(*) {
    opacity: 0.5;
  }
  .dropzone:is(:hover, :focus-within) > :global(*) {
    opacity: 1;
  }

  .dropzone:global(.over) {
    outline: 0.33em dotted var(--danger);
  }
</style>
