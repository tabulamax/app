<script>
	import { Btn, Modal } from '@kazkadien/svelte';
	import { generateCode } from '../utils/generateCode';
	import ModalCard from './ModalCard.svelte';

	let html = '';
	let isModal = false;

	/** @type {import('mermaid').Mermaid} */
	let mermaid;

	async function onClick() {
		if (!mermaid) {
			mermaid = (await import('mermaid')).default;
		}

		mermaid.initialize({ securityLevel: 'loose', theme: 'default', startOnLoad: false });

		const input = generateCode('erd');

		const { svg } = await mermaid.render('erd', input);
		// console.log(svg);
		html = svg;

		isModal = true;
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

<style>
	#erd {
		background-color: white;
		border-radius: 1rem;
	}
</style>
