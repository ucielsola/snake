<script lang="ts">
	import { onMount } from 'svelte';
	import Board from './Board.svelte';

	let availableWidth = $state(0);
	let availableHeight = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="h-full w-full" bind:clientHeight={availableHeight} bind:clientWidth={availableWidth}>
		{#if availableHeight && availableWidth}
			<Board {availableHeight} {availableWidth} />
		{/if}
	</div>
{/if}
