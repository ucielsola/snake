<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		isPlay
	}: {
		isPlay: boolean;
	} = $props();
</script>

<div class="h-6 w-6 text-slate-400">
	<Icon icon={`game-icons:${isPlay ? 'play-button' : 'pause-button'}`} width="100%" height="100%" />
</div>
