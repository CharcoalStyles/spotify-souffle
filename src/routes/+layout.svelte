<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<main class="min-h-screen flex flex-col bg-neutral mx-auto full">
  <Header/>
	
	<div class="items-center text-center">
		<slot />
	</div>
</main>
