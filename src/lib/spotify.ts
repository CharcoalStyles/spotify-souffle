import { SpotifyApi, type User, type Playlist } from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

type UserAndPlaylists = User & {
	playlists: Array<Playlist>;
};

export const loading = writable(false);
export const userDetails = writable<User | null>(null);

let spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
	PUBLIC_SPOTIFY_CLIENT_ID,
	'https://localhost:5173'
);

export const userLogin = async () => {
	loading.set(true);
	const user = await spotify.currentUser.profile();
	console.log(user);
	userDetails.set(user);
	loading.set(false);
};

export const userLogout = async () => {
	await spotify.logOut();
	userDetails.set(null);
};

const getUserPlaylists = async (userId: string) => {
	const playlists: Array<Playlist> = [];
	let offset = 0;
	let limit = 20;

	while (true) {
		const response = await spotify.playlists.getUsersPlaylists(userId, limit, offset);
		playlists.push(...response.items);
		offset += limit;

		if (response.items.length < limit) {
			break;
		}
	}

	return playlists;
};
