<script lang="ts">
	import { userLogin } from '$lib/spotify';

	function login() {
		console.log('userLogin');
		userLogin();
	}
</script>

<button class="btn btn-lg btn-primary" on:click={login}>Login with Spotify</button>
