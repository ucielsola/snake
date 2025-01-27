<script lang="ts">
	import { FoodType } from './types';

	import PoisonPotion from './icons/PoisonPotion.svelte';
	import SpeedPotion from './icons/SpeedPotion.svelte';
	import SlowPotion from './icons/SlowPotion.svelte';

	import { app } from './appState.svelte';

	const { game } = app;

	let currentPotion = $derived(game.snake.currentPotion);
</script>

<div>
	<div>
		SnPos {game.snake.position.head.x} : {game.snake.position.head.y}
	</div>
	<div>
		Apples
		<pre>{JSON.stringify(game.food)}</pre>
	</div>
</div>

<div>
	{#if currentPotion === FoodType.Poison}
		<PoisonPotion />
	{:else if currentPotion === FoodType.FastPotion}
		<SpeedPotion />
	{:else if currentPotion === FoodType.SlowPotion}
		<SlowPotion />
	{/if}
</div>
