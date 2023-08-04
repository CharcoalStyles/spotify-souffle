import {
	SpotifyApi,
	type User,
	type Playlist,
	type PlaylistedTrack,
	type Page,
	type Track
} from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

export type UserAndPlaylists = User & {
	playlists: Array<Playlist>;
};

export const loading = writable(false);
export const userDetails = writable<UserAndPlaylists | null>(null);

let spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
	PUBLIC_SPOTIFY_CLIENT_ID,
	'https://localhost:5173'
);

export const userLogin = async () => {
	loading.set(true);
	const user = await spotify.currentUser.profile();
	const playlists = await getUserPlaylists(user.id);
	userDetails.set({ ...user, playlists });
	loading.set(false);
};

export const userLogout = async () => {
	await spotify.logOut();
	userDetails.set(null);
};

const getUserPlaylists = async (userId: string) => {
	const playlists: Array<Playlist> = [];
	let offset = 0;

	while (true) {
		const response = await spotify.playlists.getUsersPlaylists(userId, 20, offset);
		playlists.push(...response.items);
		offset += 20;

		if (response.next === null) {
			break;
		}
	}

	return playlists;
};

export const getPlaylistTracks = async (playlistId: string) => {
	const tracks: Array<Track> = [];

	while (true) {
		const response = (await spotify.playlists.getPlaylistItems(
			playlistId,
			undefined,
			'items(track(name, artists(id, name), album(id,name))), next'
		)) as Page<{ track: Track }>;
		response.items[0].track.artists;

		console.log(response);
		tracks.push(...response.items.map((item) => item.track));

		if (response.next === null) {
			break;
		}
	}

	return tracks;
};

// export const swapPlaylistTracks = async (
//     playlistId: string,
