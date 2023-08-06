<script lang="ts">
	import SpotifyLogin from '$lib/components/SpotifyLogin.svelte';
	import { userDetails, userLogin, loading } from '$lib/spotify';
	import { subtitle } from '$lib';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		page.subscribe(({ url: { searchParams } }) => {
			const code = searchParams.get('code');
			if (code) {
				userLogin();
			}
		});
	});
</script>

<div class="navbar w-screen justify-between bg-primary text-base-100">
	<div class="px-2 w-5">
		<div class="flex flex-wrap z-0">
			<a
				class={`flex-1 ${$subtitle === '' ? 'text-5xl' : 'text-4xl'} mb-2 whitespace-nowrap`}
				href="/">Playlist Souffle</a
			>
			{#if $subtitle !== ''}
				<p class="flex-1 text-xl">{$subtitle}</p>
			{/if}
		</div>
	</div>
	<div class="flex justify-end flex-1 px-2 pr-4">
		<div class="dropdown dropdown-end">
			<button class="btn btn-circle">
				{#if $userDetails}
					<img src={$userDetails.images[0].url} class="rounded-full w-12 h-12" alt="Profile" />
				{:else}
					<span class="text-3xl" style="margin-top:-6px">&#9776;</span>
				{/if}
			</button>
			<div class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
				<SpotifyLogin />
			</div>
		</div>
	</div>
</div>
