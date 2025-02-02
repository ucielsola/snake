<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';

	import { BaseButton } from '$lib/components';

	import { IconDirectionKey } from '$lib/components/icons';

	import { Direction } from '$lib/types';

	const { gameInstance } = app;

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
		gameInstance.changeSnakeDirection(direction);
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
	<BaseButton
		onPress={() => handleClick(Direction.Up)}
		onRelease={() => handleRelease()}
		disabled={false}
	>
		<IconDirectionKey key={Direction.Up} />
	</BaseButton>
	<div class="flex items-center gap-2">
		<BaseButton
			onPress={() => handleClick(Direction.Left)}
			onRelease={() => handleRelease()}
			disabled={false}
		>
			<IconDirectionKey key={Direction.Left} />
		</BaseButton>
		<BaseButton
			onPress={() => handleClick(Direction.Down)}
			onRelease={() => handleRelease()}
			disabled={false}
		>
			<IconDirectionKey key={Direction.Down} />
		</BaseButton>
		<BaseButton
			onPress={() => handleClick(Direction.Right)}
			onRelease={() => handleRelease()}
			disabled={false}
		>
			<IconDirectionKey key={Direction.Right} />
		</BaseButton>
	</div>
</div>
