<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		sizeClasses
	}: {
		sizeClasses?: string;
	} = $props();
</script>

<div class="{sizeClasses || 'h-full w-full'} text-blue-600">
	<Icon icon="game-icons:spiral-bottle" width="100%" height="100%" />
</div>
