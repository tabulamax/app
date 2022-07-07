<script>
  import { Btn, Modal } from '@kazkadien/svelte';
  import { generateCode } from '../utils/generateCode';
  import ModalCard from './ModalCard.svelte';
  // import MyIcon from './MyIcon.svelte';

  let html = '';
  let isModal = false;

  /** @type {import('mermaid').Mermaid} */
  let mermaid;

  async function onClick() {
    // console.log('open');
    isModal = true;

    if (!mermaid) {
      mermaid = (await import('mermaid')).default;
    }

    mermaid.initialize({ securityLevel: 'loose', theme: 'default' });
    // mermaid.initialize({ securityLevel: 'loose', theme: 'dark' });

    const input = generateCode('erd');

    mermaid.render('erDiagram', input, (svgCode) => {
      if (svgCode.length > 0) {
        // console.log(svgCode);
        html = svgCode;
        // container.innerHTML = svgCode;
      }
    });
  }
</script>

<Btn on:click={onClick} variant="outlined">
  <b>ER Diagram</b>
</Btn>

{#if isModal}
  <Modal on:close={() => (isModal = false)}>
    <ModalCard fullWidth>
      <!-- <header class="fdc"> -->
      <!--   <Btn on:click variant="outlined" round> -->
      <!--     <MyIcon name="content_copy" /> -->
      <!--     <b>Copy To Clipboard</b> -->
      <!--   </Btn> -->
      <!-- </header> -->

      <div id="erd">
        {@html html}
      </div>
    </ModalCard>
  </Modal>
{/if}

<style global>
  #erd {
    background-color: white;
    /* background-color: black; */
    border-radius: 1rem;
  }
</style>
