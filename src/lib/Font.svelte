<script>
  import { Field } from '@kazkadien/svelte';
  import { font } from '../store/font';
  import { FONT } from '../data/constants';
  import db from '../db/db';

  $: {
    // console.log($font.family);
    db.font.set({ family: $font.family, size: $font.size });
  }
</script>

<svelte:head>
  {#if $font.family == 'Roboto'}
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
  {/if}

  {#if $font.family == 'Syne'}
    <link href="https://fonts.googleapis.com/css2?family=Syne&display=swap" rel="stylesheet" />
  {/if}
</svelte:head>

<div class="box">
  <Field title="Font Size">
    <select bind:value={$font.size}>
      {#each FONT.sizes as x}
        <option value={x}>{x}</option>
      {/each}
    </select>
  </Field>
</div>

<div class="box">
  <Field title="Family">
    <select bind:value={$font.family}>
      {#each FONT.families as x}
        <option value={x}>{x}</option>
      {/each}
    </select>
  </Field>
</div>
