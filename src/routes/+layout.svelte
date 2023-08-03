<script lang="ts">
	import '../app.css';

	import SpotifyLogin from '$lib/components/SpotifyLogin.svelte';
	import { userDetails, userLogin } from '$lib/spotify';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		page.subscribe(({ url: { searchParams } }) => {
			const code = searchParams.get('code');
			if (code) {
				userLogin();
			}
		});
	});
</script>

<main class="min-h-screen flex flex-col bg-neutral mx-auto full">
	<div class="navbar w-screen justify-between bg-primary text-base-100">
		<div class="flex-1 px-2 lg:flex-none">
			<a class="text-5xl mb-2" href="/">Playlist Souffle</a>
		</div>
		<div class="flex justify-end flex-1 px-2">
			<div class="flex items-stretch">
				<div class="dropdown dropdown-end">
					{#if $userDetails}
						<button class="btn btn-ghost rounded-btn btn-square border dropdown-hover"
							><img
								src={$userDetails.images[0].url}
								class="rounded-full w-12 h-12"
								alt="Profile"
							/></button
						>
						<div
							class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
						>
            <SpotifyLogin />
						</div>
					{:else}
						<SpotifyLogin />
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="items-center text-center">
		<slot />
	</div>
</main>
