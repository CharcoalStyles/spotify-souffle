<script>
	import SpotifyLogin from '$lib/components/SpotifyLogin.svelte';
	import SpotifyLogout from '$lib/components/SpotifyLogout.svelte';

	import { isLoggedIn } from '$lib/spotify';

</script>

<div class="navbar w-screen justify-between bg-primary text-base-100">
	<h1 class="text-5xl mb-2">Playlist Souffle</h1>
	<p class="text-2xl">A playlist generator for Spotify</p>
</div>

{#if $isLoggedIn}
	<div class="w-screen text-base-100">
		<SpotifyLogout />
	</div>
{:else}
	<div class="w-screen text-base-100">
		<SpotifyLogin />
	</div>
{/if}
