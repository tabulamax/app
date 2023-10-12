<script>
	import '$lib/css/app.css';
	import '$lib/css/vars.css';
	import '$lib/css/kazkadien.css';

	import MyIcons from './MyIcons.svelte';
	import StopWar from '$lib/components/StopWar.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
</script>

<AppWrapper>
	<MyIcons />

	<StopWar />

	<div>
		<slot><!-- optional fallback --></slot>
	</div>
</AppWrapper>

<style>
	div {
		min-height: 100vh;
	}
</style>
