<script lang="ts">
	import type { Snippet } from 'svelte';

	type BaseButtonProps = {
		onPress: () => void;
		onRelease?: () => void;
		children: Snippet;
		disabled: boolean;
	};

	let { onPress, onRelease, children, disabled }: BaseButtonProps = $props();

	let pressed = $state(false);

	const handlePress = () => {
		onPress();
		pressed = true;
	};

	const handleRelease = () => {
		onRelease?.();
		pressed = false;
	};
</script>

<button
	class="cursor-pointer rounded-lg shadow {pressed ? 'scale-95' : ''}"
	onmousedown={handlePress}
	onmouseup={handleRelease}
	ontouchstart={handlePress}
	ontouchend={handleRelease}
	{disabled}
>
	<div
		class="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 inset-shadow-sm transition-colors duration-150 {pressed
			? 'bg-slate-100'
			: ''}"
	>
		{@render children()}
	</div>
</button>
