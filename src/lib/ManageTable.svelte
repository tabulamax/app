<script>
  import { Field, Btn } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import ModalCard from './ModalCard.svelte';

  import { board } from '../store/projects';
  import { activeProject } from '../store/active';

  import { ACTIONS, DATATYPES_KNEX, KEYS } from '../data/constants';
  import db from '../db/db';

  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  export let idx = -1;

  let projectTables = $board.tables
    .filter((b, i) => b && i !== idx)
    .map(({ name, id }) => ({ name, id }));

  /** @type { import("../typings/types").Column[] } columns*/
  const columns = [];

  let table = {
    id: new Date().valueOf(),
    name: '',
    isDone: false,
    columns
  };

  const handleSubmit = async () => {
    // console.log({ table });
    table.columns.forEach((col) => {
      if (col.key === 'PK') {
        col.nullable = null;
        col.unique = null;
      }
    });

    /** @type { import("../typings/types").Table[] }*/
    let tables;

    board.update((b) => {
      b.tables.splice(idx, 1, table);
      tables = b.tables;

      return b;
    });

    await db.snap.update($activeProject.id, $activeProject.snapName, { tables });

    dispatch('close');
  };

  const onAddColumn = (i) => {
    // console.log({ i });
    addColumn(i);
  };

  /**
   * @param {number} i index
   * @param {string} defaultKey
   */
  const addColumn = (i, defaultKey = '') => {
    /** @type {import("../typings/types").Column} */
    const col = {
      key: defaultKey,
      references: { tableId: null, onDelete: null },
      name: '',
      datatype: '',
      nullable: false,
      unique: false
    };
    table.columns.splice(i, 0, col);
    table = table;
    // console.log(table.columns);
  };

  const editedTable = $board.tables[idx];

  const isEdit = editedTable ? true : false;
  // console.log({ isEdit })
  if (isEdit) {
    // console.log({ editedTable })
    table.id = editedTable.id;
    table.name = editedTable.name;
    table.isDone = editedTable.isDone;
    table.columns.push(...editedTable.columns);
  } else {
    addColumn(0, 'PK');
  }

  onMount(() => {
    document.getElementById('table-name')?.focus();
  });
</script>

<ModalCard large on:close={() => dispatch('close')} title="{isEdit ? 'Update' : 'Create'} Table">
  <form on:submit|preventDefault={handleSubmit} class="form alpha fdc ">
    <div class="t-name">
      <Field label="Table Name">
        <input type="text" bind:value={table.name} id="table-name" />
      </Field>
    </div>

    {#each table.columns as col, i}
      <div class="col">
        <Btn
          on:click={() => {
            table.columns.splice(i, 1);
            table = table;
          }}
          icony
          pointy
          colored
          outlined
          accent="danger"
        >
          <MyIcon name="delete" />
        </Btn>

        <Field label="Key">
          <select bind:value={col.key}>
            {#each KEYS as k}
              <option value={k}>{k}</option>
            {/each}
          </select>
        </Field>

        <Field label="References">
          {#if col.key !== '' && col.references}
            <select bind:value={col.references.tableId} class="ct references">
              {#each projectTables as ct}
                <option value={ct.id}>{ct.name}</option>
              {/each}
            </select>
          {:else}
            <select disabled class="references">
              <option value="" />
            </select>
          {/if}
        </Field>

        <Field label="Column Name">
          <input type="text" bind:value={col.name} required />
        </Field>

        <Field label="Datatype" accent="beta">
          <select bind:value={col.datatype} class="ct" required>
            {#each Object.entries(DATATYPES_KNEX) as [k, val]}
              <option value={k}>{val}</option>
            {/each}
          </select>
        </Field>

        {#if col.key !== 'PK'}
          <Field label="Nullable">
            <select bind:value={col.nullable} class:trussy={col.nullable}>
              {#each [true, false] as val}
                <option value={val}>{val}</option>
              {/each}
            </select>
          </Field>
        {/if}

        {#if col.key === ''}
          <Field label="Unique">
            <select bind:value={col.unique} class:trussy={col.unique}>
              {#each [true, false] as val}
                <option value={val}>{val}</option>
              {/each}
            </select>
          </Field>
        {/if}

        {#if col.references?.tableId}
          <Field label="On Delete">
            <select bind:value={col.references.onDelete} class:trussy={col.unique}>
              {#each Object.entries(ACTIONS) as [k, val]}
                <option value={k}>{val}</option>
              {/each}
            </select>
          </Field>
        {/if}

        <div class="btn-add">
          <Btn on:click={() => onAddColumn(i + 1)} icony pointy outlined colored accent="gamma">
            <MyIcon name="add" />
          </Btn>
        </div>
      </div>
    {/each}

    <div class="fce sub">
      <Btn type="submit" classic>{isEdit ? 'Update' : 'Create'}</Btn>
    </div>
  </form>
</ModalCard>

<style>
  .btn-add {
    /* background-color: #fff; */
    margin-left: auto;
    /* border-left: 1px solid var(--line); */
    /* padding-left: 1rem; */
  }

  .t-name {
    background-color: var(--bg-darker);
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  .col {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1ch;
    padding: 0.25rem 1rem 1rem;
    border-radius: 1rem;

    /* background-color: darkkhaki; */
  }

  .col:is(:focus-within) {
    background-color: var(--bg-darker);
  }
  .col:is(:hover) {
    background-color: var(--bg-darkest);
  }

  select.trussy {
    background-color: hsla(var(--alpha-hsl), 0.25);
  }

  .references {
    width: 12ch;
  }

  .sub {
    margin-top: 3rem;
  }
</style>
