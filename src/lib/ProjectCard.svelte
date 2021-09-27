<script>
  import { Btn, Field, Snackbar } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import SnapActions from './SnapActions.svelte';

  import { ws, board } from '../store/projects';
  import { activeProject } from '../store/active';

  import { deleteProject } from '../utils/projectAndSnap';
  import db from '../db/db';

  let snack = '';

  $: showSnapActions = $activeProject.snapName !== 'current';

  let is = { edit: false, confirmDelete: false };

  let updates = {
    title: $board.title,
    notes: $board.notes
  };

  const onDelete = () => {
    is.confirmDelete = true;
    // console.log('onDelete')
    setTimeout(() => (is.confirmDelete = false), 1500);
  };

  const onConfirmDelete = async () => {
    // console.log('onConfirmDelete')
    is.edit = false;
    is.confirmDelete = false;

    await deleteProject();

    snack = 'Deleted !';
  };

  const onEditingDone = async () => {
    const proj = $ws.projects.find((p) => p.id === $activeProject.id);
    // console.log({ proj })
    proj.title = updates.title;
    is.edit = false;

    if (updates.title !== $board.title) {
      // console.log('upd title')
      await db.projects.update(proj);
      board.update((n) => ({ ...n, title: updates.title }));
      // console.log($board);
    }

    if (updates.notes !== $board.notes) {
      // console.log('upd notes')
      db.snap.update($activeProject.id, $activeProject.snapName, { notes: $board.notes });
    }
  };

  $: editing = is.edit && $activeProject.snapName == 'current';
</script>

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}

<section id="project-card">
  {#if editing}
    <div class="card w-max">
      <form class="form fdc g1  alpha" on:submit|preventDefault>
        <Field label="Project Title">
          <input type="text" bind:value={updates.title} />
        </Field>

        <Field label="Project Notes">
          <textarea bind:value={updates.notes} rows="10" required />
        </Field>

        <div class="btns fsb g1">
          <Btn on:click={onEditingDone} classic>
            <MyIcon name="done_all" />
            <span>done</span>
          </Btn>
          {#if !is.confirmDelete}
            <Btn on:click={onDelete} classic accent="danger">
              <MyIcon name="delete" />
              <span>delete project</span>
            </Btn>
          {:else}
            <Btn on:click={onConfirmDelete} classic accent="danger">
              <MyIcon name="delete_forever" />
              <span>click to confirm delete</span>
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

        {#if $activeProject.snapName == 'current'}
          <Btn on:click={() => (is.edit = true)} icony accent="alpha">
            <MyIcon name="edit" />
          </Btn>
        {/if}
      </div>

      <p>{$board.notes}</p>
    </div>
  {/if}

  {#if showSnapActions}
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
