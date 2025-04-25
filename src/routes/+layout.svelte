<script lang="ts">
  import { g } from "$lib/global.svelte";
  import { derivePromise } from "$lib/utils.svelte";
  
  let { children } = $props();

  const pages = derivePromise(
    undefined,
    async () => await g.orchard?.pages.items(),
  );
</script>

<!-- sidebar -->
{@render children()}
