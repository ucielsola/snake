<script lang="ts">
	import { app } from './appState.svelte';
	import BaseButton from './BaseButton.svelte';
	import PlayPauseKeyIcon from './icons/PlayPauseKeyIcon.svelte';

	import { GameStatus } from './types';

	const { game } = app;

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

<BaseButton onPress={() => (isPlay ? onPause() : onPlay())} disabled={!isPause && !isPlay}>
	<PlayPauseKeyIcon {isPlay} />
</BaseButton>
