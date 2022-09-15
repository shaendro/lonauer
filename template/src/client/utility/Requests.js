import { navigate } from 'svelte-navigator';

const constructUrl = (url) => {
	try {
		return new URL(url);
	} catch {
		return new URL(`${location.origin}${url}`);
	}
};

export const login = () => {
	navigate('/login', { state: { from: location.pathname }, replace: true });
};

export const httpGet = async (url) => {
	try {
		url = constructUrl(url);
		const search = [url.search.replaceAll('?', ''), location.search.replaceAll('?', '')].filter((filter) => filter).join('&');
		const response = await fetch(`${url.origin}${url.pathname}?${search}`, {
			method: 'GET',
			headers: { authorization: localStorage.getItem('token') },
		});
		if (response.status === 401) return login();
		return await response.text();
	} catch (error) {
		console.error(error);
	}
};

export const httpPost = async (url, data) => {
	try {
		url = constructUrl(url);
		const search = [url.search.replaceAll('?', ''), location.search.replaceAll('?', '')].filter((filter) => filter).join('&');
		const response = await fetch(`${url.origin}${url.pathname}?${search}`, {
			method: 'POST',
			headers: { authorization: localStorage.getItem('token'), 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (response.status === 401) return login();
		return await response.text();
	} catch (error) {
		console.error(error);
	}
};

export const httpPatch = async (url, data) => {
	try {
		url = constructUrl(url);
		const search = [url.search.replaceAll('?', ''), location.search.replaceAll('?', '')].filter((filter) => filter).join('&');
		const response = await fetch(`${url.origin}${url.pathname}?${search}`, {
			method: 'PATCH',
			headers: { authorization: localStorage.getItem('token'), 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (response.status === 401) return login();
		return await response.text();
	} catch (error) {
		console.error(error);
	}
};

export const httpDelete = async (url) => {
	try {
		url = constructUrl(url);
		const search = [url.search.replaceAll('?', ''), location.search.replaceAll('?', '')].filter((filter) => filter).join('&');
		const response = await fetch(`${url.origin}${url.pathname}?${search}`, {
			method: 'DELETE',
			headers: { authorization: localStorage.getItem('token') },
		});
		if (response.status === 401) return login();
		return await response.text();
	} catch (error) {
		console.error(error);
	}
};
