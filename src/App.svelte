<script>
  import Index from './view/Index.svelte';
  import AppFooter from '$lib/AppFooter.svelte';
  import StopWar from './lib/StopWar.svelte';
</script>

<StopWar />

<div>
  <Index />
</div>

<AppFooter />

<style>
  div {
    min-height: 100vh;
  }
</style>
