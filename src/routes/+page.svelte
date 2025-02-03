<script lang="ts">
	import {
		BoardWrapper,
		DirectionKeys,
		PlayPauseButton,
		Score,
		Timer,
		CurrentPotion
	} from '$lib/components';
	import { app } from '$lib/logic';
	import { fade } from 'svelte/transition';
</script>

{#if app?.gameInstance}
	<div class="h-screen w-screen overflow-hidden" in:fade>
		<div class="flex h-full w-full flex-col">
			<div class="grow overflow-hidden">
				<BoardWrapper />
			</div>

			<div class="flex w-full items-center border-t p-2">
				<div class="w-2/12">
					<Score />
				</div>
				<div class="flex w-8/12 items-center justify-center border-x">
					<div class="w-2/12">
						<CurrentPotion />
					</div>
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
{/if}
