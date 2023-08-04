<script>
	import { subtitle, selectedPlaylist } from '$lib';
	import { userDetails } from '$lib/spotify';
	import { onMount } from 'svelte';

	onMount(() => {
		subtitle.set('');
    selectedPlaylist.set(null);
	});
	const pages = [
		{
			name: 'Classic Souffle',
			path: '/classic',
			description: 'Replace each song in the playlist with another song from the same artist'
		}
	];
</script>

{#if $userDetails === null}
	<p class="text-lg text-base-100">You will need to login to Spotify before continuing</p>
{:else}
	<p class="text-lg text-base-100">You are logged in as {$userDetails.display_name}</p>
	<p class="text-lg text-base-100">How would you like to mix up your playlist?</p>

	<div class="flex flex-wrap place-content-center ">
		{#each pages as { name, path, description }}
			<div class="card w-64 bg-primary text-primary-content m-4">
				<div class="card-body text-center">
					<h2 class="text-2xl font-bold">{name}</h2>
					<p>{description}</p>
					<div class="card-actions justify-center">
						<a href={path} class="btn btn-block">Start</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
