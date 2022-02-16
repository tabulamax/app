<script>
  import { Btn, Field, Snackbar, Tooltip } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import SnapActions from './SnapActions.svelte';

  import { ws, board } from '../store/projects';
  import { activeProject } from '../store/active';

  import { deleteProject } from '../utils/projectAndSnap';
  import db from '../db/db';

  let snack = '';

  $: is_current = $activeProject.snapName === 'current';

  let is_edit = false;
  let is_delete = false;

  let updates = {
    title: 'title',
    notes: 'notes'
  };

  function onDelete() {
    is_delete = true;
    // console.log('onDelete')
    setTimeout(() => (is_delete = false), 1500);
  }

  async function onConfirmDelete() {
    // console.log('onConfirmDelete')
    is_edit = false;
    is_delete = false;

    await deleteProject();

    snack = 'Deleted !';
  }

  function onEdit() {
    if (is_current) {
      is_edit = true;

      updates = {
        title: $board.title,
        notes: $board.notes
      };
    } else {
      console.warn('not allowed to edit');
    }
  }

  async function onEditingDone() {
    const proj = $ws.projects.find((p) => p.id === $activeProject.id);
    // console.log({ proj })
    proj.title = updates.title;
    is_edit = false;

    if (updates.title !== $board.title) {
      // console.log('upd title')
      await db.projects.update(proj);
      board.update((n) => ({ ...n, title: updates.title }));
      // console.log($board);
    }

    if (updates.notes !== $board.notes) {
      // console.log('upd notes');
      await db.snap.update($activeProject.id, $activeProject.snapName, { notes: updates.notes });
      board.update((n) => ({ ...n, notes: updates.notes }));
    }
  }
</script>

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}

<section id="project-card">
  {#if is_edit}
    <div class="card w-max">
      <form class="form fdc g1 alpha" on:submit|preventDefault>
        <Field label="Project Title">
          <input type="text" bind:value={updates.title} />
        </Field>

        <Field label="Project Notes">
          <textarea bind:value={updates.notes} rows="10" required />
        </Field>

        <div class="btns fsb g1">
          <Btn on:click={onEditingDone} filled>
            <MyIcon name="done_all" />
            <b>done</b>
          </Btn>
          {#if !is_delete}
            <Btn on:click={onDelete} filled accent="danger">
              <MyIcon name="delete" />
              <b>delete project</b>
            </Btn>
          {:else}
            <Btn on:click={onConfirmDelete} filled accent="danger">
              <MyIcon name="delete_forever" />
              <b>click to confirm delete</b>
            </Btn>
          {/if}
        </div>
      </form>
    </div>
  {:else}
    <div class="card w-max">
      <div class="fsb top">
        <header>
          <h2>{$board.title}</h2>

          <h4>👉 {$activeProject.snapName}</h4>
        </header>

        {#if is_current}
          <Btn on:click={onEdit} iconOnly accent="alpha">
            <Tooltip text="edit project" />
            <MyIcon name="edit" />
          </Btn>
        {/if}
      </div>

      <p>{$board.notes}</p>
    </div>
  {/if}

  {#if !is_current}
    <div class="w-max"><SnapActions /></div>
  {/if}
</section>

<style>
  #project-card {
    border-top: 1px solid var(--line);
    padding: 4em 0 25vh;
    margin-top: 4em;

    /* background-color: rgba(0, 255, 255, 0.3); */
  }

  .w-max {
    max-width: 100ch;
    margin: 0 auto;
  }

  .card {
    background-color: var(--bg);
    color: var(--text);
    padding: 1em 2em 3em;
    border: 1px solid var(--line);
    border-radius: 1rem;
  }

  .top {
    align-items: baseline;
    border-bottom: 1px solid var(--line);
    margin-bottom: 2em;
  }

  header {
    flex: 1 1;
    align-items: baseline;
  }
  h2 {
    color: var(--text-alpha);
  }
  h4 {
    color: var(--text-beta);
  }

  p {
    white-space: pre-line;
  }

  /* is edit */
  .btns {
    margin-top: 2em;
    gap: 1em;
    flex-wrap: wrap;
  }
</style>
