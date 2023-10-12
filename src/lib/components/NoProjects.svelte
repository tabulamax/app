<script>
	import { Alert } from '@kazkadien/svelte';
	import CreateProject from './CreateProject.svelte';
</script>

<div class="fce" style="min-height: 100vh;">
	<div class="fdc g1">
		<Alert accent="danger" filled closable={false}>
			<p>No projects found. Please create one to use the app.</p>
		</Alert>
		<CreateProject />
	</div>
</div>
