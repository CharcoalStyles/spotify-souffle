<script lang="ts">
	import { subtitle, selectedPlaylist } from '$lib';
	import { userDetails, getPlaylistTracks, type UserAndPlaylists } from '$lib/spotify';
	import { onMount } from 'svelte';

	let details: UserAndPlaylists;
	const perPage = 6;
	let page = 1;

	$: currentPage = details.playlists
		.slice((page - 1) * perPage, page * perPage)
		.map(({ name, images, id }) => {
			return {
				id,
				name,
				image:
					images.length > 0
						? images.reduce((prev, curr) => {
								if (prev.width > curr.width) return prev;
								else return curr;
						  }).url
						: ''
			};
		});
	$: totalPages = Math.ceil(details.playlists.length / perPage);

	onMount(() => {
		subtitle.set('Original Souffle');
	});

	userDetails.subscribe((value) => {
		if (value !== null) details = value;
		else {
			if (window) {
				window.location.href = '/';
			} else {
				console.log('window is undefined');
			}
		}
	});

	const nextPage = () => {
		page += 1;
	};
	const previousPage = () => {
		page -= 1;
	};

	const selectPlaylist = async (playlistId: string) => {
		const pl = details.playlists.find((playlist) => playlist.id === playlistId);
		if (pl) selectedPlaylist.set(pl);
	};
</script>

<div class="join">
	<div class="join grid grid-cols-2 mt-2">
		<button class="join-item btn" disabled={page === 1} on:click={previousPage}
			>Previous page</button
		>
		<button class="join-item btn" disabled={page === totalPages} on:click={nextPage}>Next</button>
	</div>
</div>
<div class="grid place-items-center">
	<table class="table table-xs place-items-center w-1/2">
		<tbody>
			{#each currentPage as { name, image, id }}
				<tr class="hover:bg-secondary cursor-pointer" on:click={() => selectPlaylist(id)}>
					<th>
						<div class="avatar">
							<div class="w-12 h-12">
								<img src={image} alt={`${name} playlist`} />
							</div>
						</div>
					</th>
					<td><p class="text-sm text-accent">{name}</p></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
