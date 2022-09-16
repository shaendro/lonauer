<script>
	import './app.css';

	import { links, Route, Router } from 'svelte-navigator';

	import { translate } from './utility/Translations';
	import Navigation from './components/Navigation.svelte';
	import HeadConfig from './components/HeadConfig.svelte';
	import PrivateRoute from './components/PrivateRoute.svelte';

	import Home from './index/index.svelte';
	import Login from './components/Login.svelte';
</script>

<Router primary={false}>
	<HeadConfig title="Lonauer" image="/favicon.png" description={translate('textDescription')} />
	<main class="overflow-hidden" use:links>
		<Navigation />
		<div class="my-4 grid p-2">
			<Route path="/login">
				<Login />
			</Route>

			<PrivateRoute path="/" let:location let:registerFocus>
				<Home />
			</PrivateRoute>
		</div>
	</main>
</Router>
