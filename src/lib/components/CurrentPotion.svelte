<script lang="ts">
	import { app } from '$lib/logic';
	import { FoodType } from '$lib/types';
	import { fade } from 'svelte/transition';
	import FastPotion from './icons/FastPotion.svelte';
	import SlowPotion from './icons/SlowPotion.svelte';

	const { gameInstance } = app;

	let remainingTime = $derived(Math.ceil(gameInstance?.remainingPotionTime || 0));
</script>

{#if !!gameInstance.currentPotion}
	<div class="flex flex-col items-center justify-center gap-2" transition:fade>
		{#if gameInstance.currentPotion === FoodType.FastPotion}
			<div class="h-16 w-16 animate-pulse">
				<FastPotion />
			</div>

			<span> Double Speed! </span>
		{:else if gameInstance.currentPotion === FoodType.SlowPotion}
			<div class="h-16 w-16 animate-pulse">
				<SlowPotion />
			</div>
			<span> Half Speed! </span>
		{/if}
		<div class="mt-2">
			{remainingTime ? `-${remainingTime}` : ''}
		</div>
	</div>
{/if}
