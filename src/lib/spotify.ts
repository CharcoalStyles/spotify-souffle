import {
	SpotifyApi,
	type User,
	type Playlist,
	type Page,
	type Track,
	type SimplifiedTrack
} from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';
import { PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_DOMAIN } from '$env/static/public';

const envVars = import.meta.env;
const keys = Object.keys(envVars);
const vals = Object.values(envVars);
const zip = keys.map((key, i) => [key, vals[i]]);
console.log(zip);

export type UserAndPlaylists = User & {
	playlists: Array<Playlist>;
};

export const loading = writable(false);
export const userDetails = writable<UserAndPlaylists | null>(null);

let spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
	PUBLIC_SPOTIFY_CLIENT_ID,
	`https://${PUBLIC_DOMAIN}`
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

export const swapTrack = async (track: SimplifiedTrack) => {
	const albums = await spotify.artists.albums(track.artists[0].id, 'album,single', undefined, 49);
	const { id: albumId } = albums.items[Math.floor(Math.random() * albums.items.length)];
	const { items } = await spotify.albums.tracks(albumId);
	return items[Math.floor(Math.random() * items.length)];
};

export const savePlaylist = async (
	userId: string,
	name: string,
	tracks: Array<SimplifiedTrack>
) => {
	const playlist = await spotify.playlists.createPlaylist(userId, {
		name,
		description: 'Baked with love by Spotify Soufflé'
	});

	await spotify.playlists.addItemsToPlaylist(
		playlist.id,
		tracks.map((track) => track.uri)
	);

	return playlist;
};
