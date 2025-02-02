<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';
	import { BaseButton } from '$lib/components';
	import { IconPause, IconPlay } from '$lib/components/icons';

	import { GameStatus } from '$lib/types';

	const { gameInstance: game } = app;

	let isPlay = $derived(game.status === GameStatus.Playing);
	let isPause = $derived(game.status === GameStatus.Paused);

	const onPlay = () => game.play();
	const onPause = () => game.pause();

	const onKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			e.preventDefault();
			isPlay ? onPause() : onPlay();
		}
	};
</script>

<svelte:window onkeydown={onKeydown} />

<BaseButton onPress={() => (isPlay ? onPause() : onPlay())}>
	{#if isPlay}
		<IconPause />
	{:else}
		<IconPlay />
	{/if}
</BaseButton>
