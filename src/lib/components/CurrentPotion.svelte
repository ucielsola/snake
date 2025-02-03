<script lang="ts">
	import { app } from '$lib/logic';
	import { FoodType } from '$lib/types';
	import { fade } from 'svelte/transition';
	import FastPotion from './icons/FastPotion.svelte';
	import SlowPotion from './icons/SlowPotion.svelte';

	const { gameInstance } = app;
</script>

{#if !!gameInstance.currentPotion}
	<div class="-mt-16 ml-12 flex flex-col items-center justify-center gap-2 sm:m-0" transition:fade>
		{#if gameInstance.currentPotion === FoodType.FastPotion}
			<div class="h-8 w-8 animate-pulse sm:h-16 sm:w-16">
				<FastPotion />
			</div>

			<span class="text-[12px] whitespace-nowrap sm:text-sm"> Double Speed! </span>
		{:else if gameInstance.currentPotion === FoodType.SlowPotion}
			<div class="h-8 w-8 animate-pulse sm:h-16 sm:w-16">
				<SlowPotion />
			</div>
			<span class="text-[12px] whitespace-nowrap sm:text-sm"> Half Speed! </span>
		{/if}
	</div>
{/if}
