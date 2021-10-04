<script>
  import { Btn, Icon } from '@kazkadien/svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let title = '';
  export let large = false;
</script>

<div class="card alpha" class:large>
  {#if title}
    <header class="fsb">
      <h3>{title}</h3>

      <Btn accent="danger" icony on:click={() => dispatch('close')}>
        <Icon name="close" />
      </Btn>
    </header>

    <section class="body">
      <slot />
    </section>
  {:else}
    <slot />
  {/if}
</div>

<style>
  .card {
    background-color: var(--bg);
    border-radius: 1rem;
    border: 1px solid var(--line);

    --w: calc(100vw - 4rem);
    width: min(var(--w), 120ch);
    /* background-color: aqua; */
  }

  @media only screen and (min-width: 740px) {
    .card {
      width: min(80vw, 120ch);
    }
  }

  .card.large {
    width: min(100%, 120ch);
  }

  .card > header {
    padding: 0.33rem var(--rsx);
    border-bottom: 1px solid var(--line);
  }

  .card > .body {
    padding: 3rem var(--rsx) 3rem;
    /* background-color: rgba(52, 134, 63, 0.5); */
  }
</style>
