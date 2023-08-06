<script lang="ts">
	import { subtitle, selectedPlaylist } from '$lib';
	import PlaylistList from '$lib/components/PlaylistList.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import { userDetails, getPlaylistTracks, swapTrack, savePlaylist } from '$lib/spotify';
	import type { SimplifiedTrack } from '@spotify/web-api-ts-sdk';
	import { onMount } from 'svelte';

	onMount(() => {
		subtitle.set('Original Souffle');
	});

	let playlistTracks: Array<SimplifiedTrack> = [];
	let alternateTracks: Array<SimplifiedTrack> = [];

	selectedPlaylist.subscribe((value) => {
		if (value !== null) {
			getPlaylistTracks(value.id).then((tracks) => {
				playlistTracks = tracks;
			});
		}
	});

	let cooking = false;
	let cooked = false;

	const cook = () => {
		cooking = true;
		cooked = false;
		alternateTracks = playlistTracks.map((track) => {
			return {
				...track,
				artists: [{ ...track.artists[0], name: '...' }],
				name: '...'
			};
		});
		Promise.all(
			playlistTracks.map(async (track, index) => {
				await new Promise((resolve) => setTimeout(resolve, 100 * index));

				const newTrack = await swapTrack(track);
				alternateTracks[index] = newTrack;
				return true;
			})
		).then(() => {
			cooking = false;
			cooked = true;
		});
	};

	const save = () => {
		savePlaylist($userDetails!.id, `${$selectedPlaylist!.name} - Soufflé`, alternateTracks).then(
			() => {
				cooked = false;
			}
		);
	};
</script>

{#if playlistTracks.length > 0}
	<p class="text-lg text-base-100">
		You have selected {$selectedPlaylist ? $selectedPlaylist.name : ''}
	</p>
	<button class="btn btn-primary" on:click={cook} disabled={cooking}
		>{cooking ? 'Cooking!' : 'Cook your playlist'}</button
	>
	{#if cooked}
		<button class="btn btn-secondary" on:click={save} disabled={cooking}
			>Save your playlist
		</button>
	{/if}
	<TrackList tracksLeft={playlistTracks} tracksRight={alternateTracks} />
{:else if $userDetails && $userDetails.playlists.length > 0}
	<p class="text-lg text-base-100">Select the playlist you want to Souffle</p>
	<PlaylistList />
{:else}
	<p class="text-lg text-base-100">You don't have any playlists</p>
{/if}
