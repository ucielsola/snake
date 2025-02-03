<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';

	import { IconApple, IconFastPotion, IconSlowPotion } from '$lib/components/icons';

	import { FoodType } from '$lib/types';

	const { gameInstance } = app;

	let apples = $derived(gameInstance.eaten?.filter((f) => f === FoodType.Apple)?.length);
	let slowPotions = $derived(gameInstance.eaten?.filter((f) => f === FoodType.SlowPotion)?.length);
	let fastPotions = $derived(gameInstance.eaten?.filter((f) => f === FoodType.FastPotion)?.length);
</script>

<div class="flex flex-col gap-4">
	Score:
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconApple />
			</div>
			<span>
				: {apples || '--'}
			</span>
		</div>

		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconSlowPotion />
			</div>
			<span>
				: {slowPotions || '--'}
			</span>
		</div>

		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconFastPotion />
			</div>
			<span>
				: {fastPotions || '--'}
			</span>
		</div>
	</div>
</div>

<!-- <div>
	{#if currentPotion === FoodType.Poison}
		<PoisonPotion />
	{:else if currentPotion === FoodType.FastPotion}
		<SpeedPotion />
	{:else if currentPotion === FoodType.SlowPotion}
		<SlowPotion />
	{/if}
</div> -->
