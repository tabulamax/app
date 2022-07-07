<script>
  import { Btn, Modal } from '@kazkadien/svelte';
  import { generateCode } from '../utils/generateCode';
  import ModalCard from './ModalCard.svelte';

  let html = '';
  let isModal = false;

  /** @type {import('mermaid').Mermaid} */
  let mermaid;

  async function onClick() {
    isModal = true;

    if (!mermaid) {
      mermaid = (await import('mermaid')).default;
    }

    // @ts-ignore
    mermaid.initialize({ securityLevel: 'loose', theme: 'default' });

    const input = generateCode('erd');

    mermaid.render('erDiagram', input, (svgCode) => {
      if (svgCode.length > 0) {
        // console.log(svgCode);
        html = svgCode;
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
      <div id="erd">
        {@html html}
      </div>
    </ModalCard>
  </Modal>
{/if}

<style global>
  #erd {
    background-color: white;
    border-radius: 1rem;
  }
</style>
