<script>
  import { Btn, Dropdown, Icon, ThemeSelect } from '@kazkadien/svelte';
  import ImpExp from './ImpExp.svelte';
  import CreateProject from './CreateProject.svelte';
  import CreateSnap from './CreateSnap.svelte';
  import GenerateCode from './GenerateCode.svelte';
  import Font from './Font.svelte';
  import NavProjects from './NavProjects.svelte';
  import MyIcon from './MyIcon.svelte';

  import { showOnlyKeys } from '../store/projects';
</script>

<form class="form fdc g1 alpha" on:submit|preventDefault>
  <div class="box projs">
    <NavProjects />
  </div>

  <div class="sec">
    <CreateProject />
    <CreateSnap />
    <ImpExp />
  </div>

  <div class="in-two box">
    <Font />
  </div>

  <div class="fse g1">
    <Dropdown outlined iconOnly top hoverable>
      <Icon name="brightness_low" slot="dropbtn" />
      <ThemeSelect heading="THEME" />
    </Dropdown>

    <Btn
      iconOnly
      accent="alpha"
      filled={$showOnlyKeys}
      outlined={!$showOnlyKeys}
      on:click={() => ($showOnlyKeys = !$showOnlyKeys)}
    >
      <MyIcon name="key" />
    </Btn>
  </div>

  <div class="sec">
    <GenerateCode />
  </div>
</form>

<style>
  form :global(.menu-list) {
    /* outline: 3px dotted blueviolet; */
    border: 1px solid var(--line) !important;
    padding-inline: 0.33rem !important;
  }

  form > * {
    padding-top: 1rem;
  }
  form > * ~ * {
    border-top: 1px solid var(--line);
  }

  .box {
    display: grid;
    gap: 0.33rem;
    /* background-color: rgba(255, 255, 255, 0.13); */
  }

  .box.in-two {
    grid-template-columns: repeat(2, 1fr);
  }

  .box > :global(*) {
    padding: 0 0.5rem;

    background-color: var(--bg-darker);
    border-radius: 0.5rem;
    border: 1px solid var(--line);
  }

  .sec {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
