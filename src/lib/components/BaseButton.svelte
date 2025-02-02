<script lang="ts">
	import type { Snippet } from 'svelte';

	type BaseButtonProps = {
		onPress: () => void;
		onRelease?: () => void;
		children: Snippet;
		disabled?: boolean;
		isActive?: boolean;
	};

	let { onPress, onRelease, children, disabled, isActive }: BaseButtonProps = $props();

	const handlePress = () => {
		onPress();
	};

	const handleRelease = () => {
		onRelease?.();
	};
</script>

<button
	class="cursor-pointer rounded-lg shadow {isActive ? 'scale-95' : ''}"
	onmousedown={handlePress}
	onmouseup={handleRelease}
	ontouchstart={handlePress}
	ontouchend={handleRelease}
	disabled={disabled ?? false}
>
	<div
		class="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 inset-shadow-sm transition-colors duration-150 {isActive
			? 'bg-slate-100'
			: ''}"
	>
		{@render children()}
	</div>
</button>
