<script>
  let { dialog = $bindable() } = $props();
</script>
<dialog bind:this={dialog} on:close class="px-3 py-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
	<slot/>
</dialog>
