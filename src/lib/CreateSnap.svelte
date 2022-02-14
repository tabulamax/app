<script>
  import { Btn, Field, Modal, Snackbar } from '@kazkadien/svelte';
  import ModalCard from './ModalCard.svelte';
  import { createSnap } from '../utils/projectAndSnap';

  let modalIsOpen = false;
  let snack = '';

  let title = '';
  let notes = '';

  async function handleSubmit() {
    // console.log({ title, notes });
    await createSnap(title, notes);

    snack = `Snap ${title} created !`;
    modalIsOpen = false;

    title = '';
    notes = '';
  }
</script>

<Btn text="NEW SNAP" outlined on:click={() => (modalIsOpen = true)} />

{#if modalIsOpen}
  <Modal blurBG on:close={() => (modalIsOpen = false)}>
    <ModalCard title="CREATE NEW SNAP" on:close={() => (modalIsOpen = false)}>
      <form class="form alpha fdc g1" on:submit|preventDefault={handleSubmit}>
        <Field label="Title">
          <input type="text" bind:value={title} required />
        </Field>

        <Field label="Notes">
          <textarea rows="8" bind:value={notes} required />
        </Field>

        <div class="fce">
          <Btn text="Create" filled type="submit" accent="alpha" />
        </div>
      </form>
    </ModalCard>
  </Modal>
{/if}

{#if snack}
  <Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}
