<script>
  import { Btn, Modal, Toast, Snackbar, Dropdown } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import ModalCard from './ModalCard.svelte';

  import { generateCode } from '../utils/generateCode';

  import '../css/prism.css';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-sql';
  import 'prismjs/components/prism-go';

  /** @typedef {import("../typings/types").Tech} Tech*/

  let snack = '';
  let toast = '';

  let code = 'code';
  let prismHTML = '';
  let modalIsOpen = false;

  async function onCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      // console.log('onCopyToClipboard');
      snack = 'Copied !';
      modalIsOpen = false;
    } catch (error) {
      console.error(error);
      toast = 'Something went wrong :( !';
    }
  }

  /** @param {Tech} tech */
  function handle(tech) {
    code = generateCode(tech);
    // console.log(code);
    if (tech.startsWith('sql:')) {
      prismHTML = Prism.highlight(code, Prism.languages.sql, 'sql');
    } else if (tech.startsWith('go:')) {
      prismHTML = Prism.highlight(code, Prism.languages.go, 'go');
    } else if (tech == 'js: d.ts') {
      prismHTML = Prism.highlight(code, Prism.languages.typescript, 'typescript');
    } else {
      prismHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
    // console.log(prismHTML);
    modalIsOpen = true;
  }

  /** @type {Tech[]}*/
  const _tech = [
    'js: knex',
    'js: references',
    'js: d.ts',
    'go: references',
    'go: types',
    'sql: postgres',
    'sql: sqlite3'
  ];
</script>

<div class="">
  <Dropdown withArrows place="top" grow variant="outlined">
    <svelte:fragment slot="dropbtn">
      <MyIcon name="code" />
      <b>Code</b>
    </svelte:fragment>

    <div class="menu">
      {#each _tech as tech}
        <button
          class="btn text"
          on:click={(ev) => {
            ev.currentTarget.closest('details').open = false;
            handle(tech);
          }}
        >
          {tech}
        </button>
      {/each}
    </div>
  </Dropdown>
</div>

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}

{#if modalIsOpen}
  <Modal on:close={() => (modalIsOpen = false)}>
    <ModalCard>
      <header class="fdc">
        <Btn on:click={onCopyToClipboard} variant="outlined" round>
          <MyIcon name="content_copy" />
          <b>Copy To Clipboard</b>
        </Btn>
      </header>

      <div class="rpx">
        <pre class="language-html">
					<!-- { code } -->
          {@html prismHTML}
				</pre>
      </div>
    </ModalCard>
  </Modal>
{/if}

{#if toast}
  <Toast
    accent="alpha"
    autoclose={3000}
    closable={false}
    iconName="info"
    title="Error"
    body={toast}
    on:close={() => (toast = '')}
  />
{/if}

<style>
  header {
    padding: 1rem var(--rsx);
    border-bottom: 1px solid var(--line);
    display: flex;
  }
  pre {
    padding-bottom: 15vh;
  }
  .btn {
    text-transform: uppercase;
  }

  .btn:not(:last-child) {
    border-bottom: 1px solid var(--__fga);
  }
</style>
