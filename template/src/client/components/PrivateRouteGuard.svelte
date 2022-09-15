<script>
	import { onMount } from 'svelte';
	import { useNavigate, useLocation, useFocus } from 'svelte-navigator';

	import { user } from '../utility/Stores';
	import { httpGet } from '../utility/Requests';
	import { translate } from '../utility/Translations';

	let loading = true;

	const navigate = useNavigate();
	const location = useLocation();
	const registerFocus = useFocus();

	const navigateToLogin = () => {
		navigate('/login', { state: { from: $location.pathname }, replace: true });
	};

	onMount(async () => {
		try {
			const response = JSON.parse(await httpGet('/api/whoami'));
			if (response) user.set(response);
		} catch {
			navigateToLogin();
		} finally {
			loading = false;
		}
	});

	$: if (!$user && !loading) {
		navigateToLogin();
	}
</script>

{#if loading}
	<img class="m-auto aspect-square w-32 invert" src="/icons/loading.svg" alt={translate('loading')} />
{:else if $user}
	<slot {registerFocus} />
{/if}
