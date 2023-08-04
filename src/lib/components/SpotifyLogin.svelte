<script lang="ts">
	import { userLogin, userLogout, userDetails } from '$lib/spotify';

	let loggedIn = false;
	userDetails.subscribe((value) => {
		loggedIn = value !== null;
	});
	function login() {
		userLogin();
	}
	function logout() {
		userLogout();
	}
</script>

<button class="btn btn-lg btn-primary" on:click={loggedIn ? logout : login}
	>{#if loggedIn}Logout{:else}Login with Spotify{/if}</button
>
