<script lang="ts">
	import '../app.css';
	import { app } from '$lib/logic/appState.svelte';

	let { children } = $props();

	app.newGame();
</script>

{@render children()}
