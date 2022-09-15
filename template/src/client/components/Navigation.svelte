<script>
	import { user } from '../utility/Stores';
	import { httpPost } from '../utility/Requests';
	import { translate } from '../utility/Translations';

	const logout = async () => {
		await httpPost('/api/logout');
		user.set(undefined);
		localStorage.removeItem('token');
	};
</script>

<div class="relative grid grid-cols-auto-fit shadow-lg">
	<a class="grid place-items-center bg-primary text-background transition-all hover:brightness-90" href="/">
		<span class="small-caps p-2 text-3xl font-bold">MetaStack</span>
	</a>
	{#if $user}
		<div class="absolute right-0 top-0 grid h-full place-items-center p-1">
			<button class="grid h-full place-items-center bg-primary text-background transition-all hover:brightness-90" type="button" on:click={() => logout()}>
				<span class="small-caps px-4 font-bold">{translate('logout')}</span>
			</button>
		</div>
	{/if}
</div>
