<script>
  import { Btn } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';

  import { board } from '../store/projects';
  import { activeProject } from '../store/active';

  import { deleteSnap } from '../utils/projectAndSnap';
  import db from '../db/db';

  let confirm = { delete: false, makeCurrent: false };
  const current = 'current';

  /** @param {"delete" | "makeCurrent"} action */
  const onClick = (action) => {
    setTimeout(() => (confirm[action] = true), 250);
    setTimeout(() => (confirm[action] = false), 2500);
  };

  const onMakeSnapCurrent = async () => {
    // console.log('onMakeSnapCurrent ', board.snapName)
    await db.snap.update($activeProject.id, current, { tables: $board.tables });

    activeProject.update((v) => ({ ...v, snapName: current }));
  };
</script>

<section id="snap-actions" class="fsb">
  {#if !confirm.makeCurrent}
    <Btn on:click={() => onClick('makeCurrent')} accent="alpha" classic>
      <span>copy to current</span>
    </Btn>
  {:else}
    <Btn on:click={onMakeSnapCurrent} accent="alpha" classic>
      <span>click to confirm</span>
    </Btn>
  {/if}

  {#if !confirm.delete}
    <Btn on:click={() => onClick('delete')} accent="danger" classic>
      <MyIcon name="delete" /><span>delete snap</span>
    </Btn>
  {:else}
    <Btn on:click={deleteSnap} accent="danger" classic>
      <MyIcon name="delete_forever" /><span>click to confirm</span>
    </Btn>
  {/if}
</section>

<style>
  #snap-actions.fsb {
    gap: 1em;
    padding: 2em 0;
    max-width: var(--project-desc-max-width);
    margin: 0 auto;

    /* background-color: aquamarine; */
  }
</style>
