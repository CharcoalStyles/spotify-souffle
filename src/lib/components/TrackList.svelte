<script lang="ts">
	import type { SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk';

	export let tracksLeft: Array<SimplifiedTrack>;
	export let tracksRight: Array<SimplifiedTrack>;
	console.log(tracksLeft, tracksRight);

	$: tracksLeftTitles = tracksLeft.map(
		({ name, artists }) => `${name} - ${artists.map((artist) => artist.name).join(', ')}`
	);
	$: tracksRightTitles = tracksRight.map(
		({ name, artists }) => `${name} - ${artists.map((artist) => artist.name).join(', ')}`
	);
	$: zipTrackTitles = tracksLeftTitles.map((left, index) => [
		left,
		tracksRightTitles[index] ? tracksRightTitles[index] : ''
	]);
</script>

<div class="grid place-items-center mx-4">
	<table class="table table-xs place-items-center">
		<tbody>
			{#each zipTrackTitles as [left, right]}
				<tr>
					<td><p class="text-sm text-accent">{left}</p></td>
					<td><p class="text-sm text-accent">{right}</p></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
