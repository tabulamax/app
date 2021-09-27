<script>
  import { Field } from '@kazkadien/svelte';

  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  import { ws, board } from '../store/projects';
  import { activeProject, activeProjectSnapNames } from '../store/active';
  import db from '../db/db';

  const current = 'current';

  async function switchSnap({ id, snapName }) {
    // console.log({ id, snapName });
    const snap = await db.snap.get(id, snapName);
    // console.log({ snap });
    const { notes, tables } = snap;

    board.update((b) => ({ ...b, notes, tables }));
  }

  async function switchProject(id) {
    // console.log({ projectID: id })
    if (!id) {
      console.log('ID: ', id);
      return;
    }

    const { notes, tables } = await db.snap.get(id, current);
    await db.activeProjectId.set(id);

    const { title } = $ws.projects.find((p) => p.id === id);

    board.set({ title, notes, tables });
  }

  let { id, snapName } = get(activeProject);
  const prev = { id, snapName };

  const unsub = activeProject.subscribe(async (curr) => {
    if (prev.id !== curr.id) {
      // console.log('currId :', curr.id);
      prev.id = curr.id;

      await switchProject(curr.id);

      activeProject.set({ id: curr.id, snapName: current });
      return;
    }

    await switchSnap(curr);
  });
  onDestroy(() => unsub());
</script>

<Field label="Project">
  <select bind:value={$activeProject.id}>
    {#each $ws.projects as project}
      <option value={project.id}>{project.title}</option>
    {/each}
  </select>
</Field>

<Field label="Snap">
  <select bind:value={$activeProject.snapName}>
    {#each $activeProjectSnapNames as snap}
      <option value={snap} selected={snap == $activeProject.snapName}>
        {$activeProject.snapName === snap ? '👉 ' : ''}
        {snap}
      </option>
    {/each}
  </select>
</Field>

<style>
  select {
    max-width: calc(240px - 3.12rem);
    /* text-overflow: ellipsis; */
  }
</style>
