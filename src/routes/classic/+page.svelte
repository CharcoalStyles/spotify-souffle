<script lang="ts">
	import { subtitle, selectedPlaylist } from '$lib';
	import PlaylistList from '$lib/components/PlaylistList.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import { userDetails, getPlaylistTracks } from '$lib/spotify';
	import type { PlaylistedTrack } from '@spotify/web-api-ts-sdk';
	import { onMount } from 'svelte';

	onMount(() => {
		subtitle.set('Original Souffle');
	});

	let playlistTracks: Array<PlaylistedTrack> = [];

	selectedPlaylist.subscribe((value) => {
		if (value !== null) {
			getPlaylistTracks(value.id).then((tracks) => {
				playlistTracks = tracks;
			});
		}
	});
</script>

{#if playlistTracks.length > 0}
	<p class="text-lg text-base-100">
		You have selected {$selectedPlaylist ? $selectedPlaylist.name : ''}
	</p>
    <button class="btn btn-primary">Cook it!</button>
	<TrackList tracks={playlistTracks} />
{:else if $userDetails && $userDetails.playlists.length > 0}
	<p class="text-lg text-base-100">Select the playlist you want to Souffle</p>
	<PlaylistList />
{:else}
	<p class="text-lg text-base-100">You don't have any playlists</p>
{/if}
