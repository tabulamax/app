<script>
  import { Btn, Icon } from '@kazkadien/svelte';
  import SidePanel from '$lib/SidePanel.svelte';
  import SavePlacing from '$lib/SavePlacing.svelte';
  import TableGrid from '$lib/TableGrid.svelte';
  import ProjectCard from '$lib/ProjectCard.svelte';
  import NoProjects from '$lib/NoProjects.svelte';

  import { ws } from '../store/projects';
  import { font } from '../store/font';

  let open = true;
</script>

{#if $ws?.loaded}
  {#if !$ws.projects.length}
    <NoProjects />
  {:else}
    <div id="index">
      <aside>
        <div class="panel" style="display: {open ? 'block' : 'none'};">
          <SidePanel />
        </div>
      </aside>

      <main style="font-size: {$font.size}px;" class={$font.family}>
        <div class="fsb g1 menu-placing">
          <Btn
            accent="alpha"
            tooltip="toggle sidebar"
            filled
            iconOnly
            on:click={() => (open = !open)}
          >
            <Icon name="menu" />
          </Btn>

          <SavePlacing />
        </div>

        <TableGrid />
        <ProjectCard />
      </main>
    </div>
  {/if}
{:else}
  <div id="index-loading" class="fce">
    <span class="loader" />
  </div>
{/if}

<style>
  .Roboto {
    font-family: 'Roboto';
  }
  .Syne {
    font-family: 'Syne';
  }
  #index-loading {
    min-height: 100vh;
    font-size: clamp(2rem, 20vw, 5rem);
  }

  #index {
    display: grid;
    grid-template-columns: auto 1fr;
    /* background-color: rgba(150, 72, 72, 0.1); */
  }

  aside {
    position: relative;
    border-right: 1px solid var(--line);
    /* background-color: var(--bg-darkest); */
  }
  aside > .panel {
    position: sticky;
    top: 0;
    width: 240px;
    padding: 0 1rem 3rem;
  }

  main {
    padding: 0em var(--rsx);
    background-color: var(--bg-dark);
  }

  .menu-placing {
    font-size: 1rem;
    padding: 1rem 0 3rem;
  }
</style>
