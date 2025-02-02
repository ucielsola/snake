<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';
	import { BaseButton } from '$lib/components';
	import { IconPause, IconPlay } from '$lib/components/icons';

	import { GameStatus } from '$lib/types';

	const { gameInstance: game } = app;

	let isPlay = $derived(game.status === GameStatus.Playing);

	let isActive = $state(false);

	const onPlay = () => {
		game.play();
	};
	const onPause = () => {
		game.pause();
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			e.preventDefault();
			isActive = true;

			isPlay ? onPause() : onPlay();
		}
	};

	const onKeyup = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			e.preventDefault();
			isActive = false;
		}
	};
</script>

<svelte:window onkeydown={onKeydown} onkeyup={onKeyup} />

<BaseButton
	{isActive}
	onPress={() => {
		isPlay ? onPause() : onPlay();
		isActive = true;
	}}
	onRelease={() => {
		console.log('Button released');
		isActive = false;
	}}
>
	{#if isPlay}
		<IconPause />
	{:else}
		<IconPlay />
	{/if}
</BaseButton>
