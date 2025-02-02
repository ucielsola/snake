<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Direction } from '$lib/types';

	let {
		key
	}: {
		key: Direction;
	} = $props();
</script>

<div class="h-6 w-6 text-slate-400 {key === Direction.Down && 'mt-2'}">
	<Icon icon={`fa-solid:caret-${key}`} width="100%" height="100%" />
</div>
