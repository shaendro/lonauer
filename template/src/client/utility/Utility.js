import { onDestroy, onMount } from 'svelte';

export const sleep = (duration = 0) => new Promise((resolve) => setTimeout(() => resolve(), duration));

export const formatDate = (date) => {
	if (!date) return '---';
	if (typeof date === 'number' || typeof date === 'string') date = new Date(date);
	const padNumber = (number) => String(number).padStart(2, '0');
	return `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}, ${padNumber(date.getDate())}.${padNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const formatTime = (time) => {
	const padNumber = (number) => `${number}`.padStart(2, '0');
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor(time / 60);
	const seconds = padNumber(Math.round(time % 60));
	if (time > 3600) return [hours, minutes, seconds].join(':');
	else return [minutes, seconds].join(':');
};

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

export const softAssign = (a, b) => {
	if (b) {
		for (const key of Object.keys(a)) {
			if (b[key] !== undefined) {
				if (Array.isArray(a[key]) || typeof a[key] !== 'object') a[key] = b[key];
				else softAssign(a[key], b[key]);
			}
		}
	}
	return a;
};

export const filledArray = (size) => {
	return Array(size)
		.fill(0)
		.map((value, index) => index);
};

export const getHash = async (input) => {
	const data = new TextEncoder('utf-8').encode(input);
	const hash = await crypto.subtle.digest('SHA-512', data);

	const hexCodes = [];
	const view = new DataView(hash);
	for (let i = 0; i < view.byteLength; i += 4) {
		const value = view.getUint32(i);
		const stringValue = value.toString(16);
		const padding = '00000000';
		const paddedValue = (padding + stringValue).slice(-padding.length);
		hexCodes.push(paddedValue);
	}

	return hexCodes.join('');
};
