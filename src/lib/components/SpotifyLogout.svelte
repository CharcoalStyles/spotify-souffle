<script lang="ts">
	import { userLogout } from '$lib/spotify';

	function login() {
		console.log('userLogout');
		userLogout();
	}
</script>

<button class="btn btn-lg btn-primary" on:click={login}>Logout</button>
