<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		sizeClasses
	}: {
		sizeClasses?: string;
	} = $props();
</script>

<div class="{sizeClasses || 'h-full w-full'} text-red-700">
	<Icon icon="game-icons:shiny-apple" width="100%" height="100%" />
</div>
