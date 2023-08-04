// place files you want to import through the `$lib` alias in this folder.

import type { Playlist } from '@spotify/web-api-ts-sdk';
import { writable } from 'svelte/store';

export const subtitle = writable('');
export const selectedPlaylist = writable<Playlist | null>(null);
