<script>
	import '../app.css';

	import { translate } from '$lib/Translations';
	import HeadConfig from '$lib/HeadConfig.svelte';
</script>

<HeadConfig title="Paul Lonauer" image="/favicon.png" description={translate('description')} />
<slot />
