<script lang="ts">
	import { app } from '$lib/logic/appState.svelte';

	import { IconApple, IconFastPotion, IconSlowPotion } from '$lib/components/icons';

	import { FoodType } from '$lib/types';

	const { gameInstance } = app;
</script>

<div class="flex flex-col gap-4">
	Score:
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconApple />
			</div>
			<span>
				: {gameInstance.eaten.filter((f) => f === FoodType.Apple).length || '--'}
			</span>
		</div>

		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconSlowPotion />
			</div>
			<span>
				: {gameInstance.eaten.filter((f) => f === FoodType.SlowPotion).length || '--'}
			</span>
		</div>

		<div class="flex items-center gap-1">
			<div class="h-5 w-5">
				<IconFastPotion />
			</div>
			<span>
				: {gameInstance.eaten.filter((f) => f === FoodType.FastPotion).length || '--'}
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
