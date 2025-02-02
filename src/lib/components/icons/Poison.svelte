<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		sizeClasses
	}: {
		sizeClasses?: string;
	} = $props();
</script>

<div class="{sizeClasses || 'h-full w-full'} text-green-700">
	<Icon icon="game-icons:poison-bottle" width="100%" height="100%" />
</div>
