<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';
	import {
		BoardWrapper,
		DirectionKeys,
		PlayPauseButton,
		SnakeStatus,
		Timer
	} from '$lib/components';

	app.newGame();
</script>

<div class="h-screen w-screen overflow-hidden">
	<div class="flex h-full w-full flex-col">
		<div class="grow overflow-hidden">
			<BoardWrapper />
		</div>

		<div class="flex w-full items-center border-t p-2">
			<div class="w-2/12">
				<SnakeStatus />
			</div>
			<div class="flex w-8/12 items-center justify-center border-x">
				<div class="w-2/12"></div>
				<div class="w-8/12">
					<DirectionKeys />
				</div>
				<div class="w-2/12">
					<PlayPauseButton />
				</div>
			</div>
			<div class="flex w-2/12 items-center justify-center">
				<Timer />
			</div>
		</div>
	</div>
</div>
