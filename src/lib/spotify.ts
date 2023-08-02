import { SpotifyApi, type User } from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

export const userDetails = writable<User|null>(null);

let spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
	PUBLIC_SPOTIFY_CLIENT_ID,
	'https://localhost:5173'
);

export const userLogin = async () => {
	const user = await spotify.currentUser.profile();
    userDetails.set(user);
};

export const userLogout = async () => {
	await spotify.logOut();
    userDetails.set(null);
};
