<script lang="ts">
	import { Direction } from '$lib/types';

	import DirectionKeyIcon from '$lib/icons/DirectionKeyIcon.svelte';

	import { app } from './appState.svelte';

	const { game } = app;

	let currentDirection = $state<Direction | null>(null);

	const handleKeyDown = (e: KeyboardEvent) => {
		currentDirection = getDirectionForKey(e.key);

		if (currentDirection) {
			changeDirection(currentDirection);
		}
	};

	const handleClick = (direction: Direction) => {
		if (direction) {
			currentDirection = direction;
			changeDirection(direction);
		}
	};

	const handleRelease = () => {
		currentDirection = null;
	};

	const changeDirection = (direction: Direction) => {
		game.changeSnakeDirection(direction);
	};

	function getDirectionForKey(key: string): Direction | null {
		let direction = null;

		if (['arrowup', 'w', 'j'].includes(key.toLocaleLowerCase())) {
			direction = Direction.Up;
		} else if (['arrowright', 'd', 'l'].includes(key.toLocaleLowerCase())) {
			direction = Direction.Right;
		} else if (['arrowdown', 's', 'k'].includes(key.toLocaleLowerCase())) {
			direction = Direction.Down;
		} else if (['arrowleft', 'a', 'h'].includes(key.toLocaleLowerCase())) {
			direction = Direction.Left;
		}

		return direction;
	}
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleRelease} />

<div class="flex flex-col items-center gap-2">
	{@render Key(Direction.Up)}
	<div class="flex items-center gap-2">
		{@render Key(Direction.Left)}
		{@render Key(Direction.Down)}
		{@render Key(Direction.Right)}
	</div>
</div>

{#snippet Key(key: Direction)}
	<button
		class="cursor-pointer rounded-lg shadow {currentDirection === key && 'scale-95'}"
		onmousedown={() => handleClick(key)}
		onmouseup={() => handleRelease()}
		ontouchstart={() => handleClick(key)}
		ontouchend={() => handleRelease()}
	>
		<div
			class="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 inset-shadow-sm transition-colors duration-150
			{currentDirection === key && 'bg-slate-100'}"
		>
			<DirectionKeyIcon {key} />
		</div>
	</button>
{/snippet}
