<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';

	let gameTimerSeconds = $derived(Math.max(0, app.gameInstance?.time));

	let seconds = $derived(gameTimerSeconds % 60);
	let minutes = $derived(Math.floor((gameTimerSeconds / 60) % 60));
</script>

<div class="flex w-fit gap-1 rounded border p-4 text-3xl font-medium inset-shadow-sm">
	{@render TimeUnit(minutes)} <span>:</span>
	{@render TimeUnit(seconds)}
</div>

{#snippet TimeUnit(timeUnit: number)}
	<span>
		{timeUnit.toString().padStart(2, '0')}
	</span>
{/snippet}
