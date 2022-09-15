<script>
	import { onMount } from 'svelte';

	export let title = undefined;
	export let image = undefined;
	export let description = undefined;
	let windowOrigin = '';

	onMount(() => {
		windowOrigin = window.location.origin;
	});
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
		<meta name="og:title" content={title} />
	{/if}
	{#if image}
		<meta name="og:image" content={`${windowOrigin}${image}`} />
	{/if}
	{#if description}
		<meta name="description" content={description} />
		<meta name="og:description" content={description} />
	{/if}
</svelte:head>
