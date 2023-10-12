<script>
	import { onMount } from 'svelte';
	import AppDesc from './AppDesc.svelte';
	/** @type {typeof import("./App.svelte").default} */
	let comp;
	onMount(async () => {
		comp = (await import('./App.svelte')).default;
	});

	const title = 'Tabulamax';
	const desc =
		'Design database tables, generate SQL and Knex.js migraions, Typescript interfaces, Golang structs, ER Diagrams.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content="/img/og.png" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if comp}
	<svelte:component this={comp} />
{:else}
	<div class="fce">
		<span class="loader" />
	</div>
{/if}

<AppDesc />
