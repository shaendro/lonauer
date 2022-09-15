<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="fixed inset-0 z-10 grid bg-black/10" on:click={() => dispatch('backgroundClick')} transition:fade|local>
	<div class="m-auto max-h-[85%] max-w-[85%] overflow-y-auto bg-background shadow-lg" on:click|stopPropagation>
		<slot />
	</div>
</div>
