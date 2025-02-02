<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		sizeClasses
	}: {
		sizeClasses?: string;
	} = $props();
</script>

<div class="{sizeClasses || 'h-full w-full'} text-amber-600">
	<Icon icon="game-icons:bottled-bolt" width="100%" height="100%" />
</div>
