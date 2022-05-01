import { onDestroy, onMount } from 'svelte';

/**
 * Starts an interval using the given callback function.
 * Callback is executed immediately in the beginning.
 * Interval is set up using Svelte's onMount.
 * Interval is cleared using Svelte's onDestroy.
 * @param {*} callback Function to be executed
 * @param {*} milliseconds Millisecond delay between executions
 */
export function onInterval(callback, milliseconds) {
	let interval = undefined;
	onMount(() => {
		callback();
		interval = setInterval(callback, milliseconds);
	});
	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
}