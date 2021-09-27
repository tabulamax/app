<script>
  import { Btn, Modal, Toast, Snackbar } from '@kazkadien/svelte';
  import MyIcon from './MyIcon.svelte';
  import ModalCard from './ModalCard.svelte';

  import { generateCode } from '../utils/generateCode';

  import '../css/prism.css';
  import Prism from 'prismjs';

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
  function handle(tech) {
    code = generateCode(tech);
    // console.log(code);
    prismHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    // console.log(prismHTML);
    modalIsOpen = true;
  }
</script>

{#each ['js:refs', 'js:knex', 'sql'] as tech}
  <Btn outlined on:click={() => handle(tech)}>
    <MyIcon name="code" />
    <span>{tech}</span>
  </Btn>
{/each}

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}

{#if modalIsOpen}
  <Modal on:close={() => (modalIsOpen = false)}>
    <ModalCard>
      <header class="fdc">
        <Btn on:click={onCopyToClipboard}>
          <MyIcon name="content_copy" />
          <span>Copy To Clipboard</span>
        </Btn>
      </header>

      <div class="cnt rpx">
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
    padding: 1rem 1rem 15vh;

    tab-size: 2ch;
    -moz-tab-size: 2ch;
    line-height: 1.33;
  }
  @media only screen and (min-width: 700px) {
    pre {
      padding: 1rem 3rem 15vh;
    }
  }
</style>
