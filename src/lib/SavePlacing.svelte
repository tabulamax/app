<script>
  import { Btn, Snackbar } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';

  import { board } from '../store/projects';
  import { activeProject } from '../store/active';

  import db from '../db/db';

  let snack = '';

  function onSavePos() {
    snack = 'Saved !';
    db.snap.update($activeProject.id, $activeProject.snapName, { tables: $board.tables });
  }
</script>

<Btn on:click={onSavePos} accent="alpha" variant="outlined">
  <MyIcon name="grid_view" />
  <b>save placing</b>
</Btn>

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}
