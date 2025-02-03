<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';

	import { IconDeadSnake, IconSlowPotion, IconFastPotion, IconApple } from '$lib/components/icons';
	import { Direction, FoodType, GameStatus, type Position } from '$lib/types';

	import { isSamePosition } from '$lib/utils';
	import { fade } from 'svelte/transition';

	let {
		availableHeight,
		availableWidth
	}: {
		availableHeight: number;
		availableWidth: number;
	} = $props();

	let board: string[][] = createBoard();

	const { gameInstance } = app;

	gameInstance.setBoardSize({
		x: board.length,
		y: board[0].length
	});

	let lastDirection: Direction = $derived(gameInstance.lastDirection);

	let boardElements: {
		snake: {
			head: Position;
			body: Position[];
		};
		slowPotion: Position | null;
		fastPotion: Position | null;
		apples: Position[];
	} = $derived({
		snake: {
			head: gameInstance.snakePosition.head,
			body: gameInstance.snakePosition.body
		},
		slowPotion: gameInstance.food.find((f) => f.type === FoodType.SlowPotion)?.position ?? null,
		fastPotion: gameInstance.food.find((f) => f.type === FoodType.FastPotion)?.position ?? null,
		apples: gameInstance.food.filter((f) => f.type === FoodType.Apple).map((f) => f.position)
	});

	function createBoard() {
		const cellPx = 24;

		let columns = Math.round(availableWidth / cellPx);
		let rows = Math.round(availableHeight / cellPx);

		if (columns % 2 !== 0) {
			columns--;
		}

		if (rows % 2 !== 0) {
			rows--;
		}

		return Array.from({ length: columns }, () => Array(rows).fill(' '));
	}
</script>

<div class="flex h-full w-full items-center justify-center">
	<div
		class="flex border {gameInstance.status === GameStatus.Lost
			? 'border-red-400'
			: 'border-slate-200'}"
	>
		{#each board as col, collIdx (collIdx)}
			<div class="flex flex-col">
				{#each col as _, cellIdx (cellIdx)}
					{@const [position] = [
						{
							x: collIdx,
							y: cellIdx
						}
					]}
					<div class="relative h-6 w-6 border {(collIdx + cellIdx) % 2 === 0 && 'bg-slate-50'}">
						{#if isSamePosition(position, boardElements.snake.head)}
							{@render SnakeHeadCell()}
						{:else if boardElements.snake.body.find((b) => isSamePosition(position, b))}
							{@render SnakeBodyCell()}
						{:else if !!boardElements.apples.find((b) => isSamePosition(position, b))}
							{@render AppleCell()}
						{:else if boardElements.slowPotion && isSamePosition(position, boardElements.slowPotion)}
							{@render SlowPotionCell()}
						{:else if boardElements.fastPotion && isSamePosition(position, boardElements.fastPotion)}
							{@render FastPotionCell()}
						{:else}
							{@render EmptyCell()}
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

{#snippet EmptyCell()}
	<div class="z-0 flex h-full w-full items-center justify-center"></div>
{/snippet}

{#snippet SnakeHeadCell()}
	<div class="z-10 flex h-full w-full items-center justify-center p-0.5">
		<div
			class="flex h-full w-full items-center justify-center rounded-t-xl
		{gameInstance.status === GameStatus.Lost ? 'bg-red-400' : 'bg-green-400'}	
		{lastDirection === Direction.Right && 'rotate-90'}
		{lastDirection === Direction.Down && 'rotate-180'}
	    {lastDirection === Direction.Left && 'rotate-270'}
		"
		>
			{#if gameInstance.status !== GameStatus.Lost}
				<div class="h-4 w-4">
					<IconDeadSnake />
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet SnakeBodyCell()}
	<div class="z-10 flex h-full w-full items-center justify-center p-0.5">
		<div
			class="h-full w-full {gameInstance.status === GameStatus.Lost
				? 'bg-red-400'
				: 'bg-green-400'}"
		></div>
	</div>
{/snippet}

{#snippet AppleCell()}
	<div class="z-10 flex h-full w-full items-center justify-center" in:fade>
		<IconApple />
	</div>
{/snippet}

{#snippet SlowPotionCell()}
	<div class="z-10 flex h-full w-full items-center justify-center" in:fade>
		<IconSlowPotion />
	</div>
{/snippet}

{#snippet FastPotionCell()}
	<div class="z-10 flex h-full w-full items-center justify-center" in:fade>
		<IconFastPotion />
	</div>
{/snippet}
