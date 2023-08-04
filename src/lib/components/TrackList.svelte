<script lang="ts">
	import type { Track } from '@spotify/web-api-ts-sdk';

	export let tracks: Array<Track>;

	$: trackTitles = tracks.map(
		({ name, artists }) => `${name} - ${artists.map((artist) => artist.name).join(', ')}`
	);
</script>

<div class="grid place-items-center">
	<table class="table table-xs place-items-center w-2/3">
		<tbody>
			{#each trackTitles as trackTitle}
				<tr class="hover:bg-secondary cursor-pointer">
					<td><p class="text-sm text-accent">{trackTitle}</p></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
