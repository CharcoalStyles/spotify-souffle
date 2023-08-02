import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

export const isLoggedIn = writable(false);

let spotify: SpotifyApi = SpotifyApi.withUserAuthorization(
	PUBLIC_SPOTIFY_CLIENT_ID,
	'https://localhost:5173'
);

export const userLogin = async () => {
	const user = await spotify.currentUser.profile();
	console.log(user);
	isLoggedIn.set(true);
};

export const userLogout = async () => {
	await spotify.logOut();
	isLoggedIn.set(false);
};
