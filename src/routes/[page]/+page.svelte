<script lang="ts">
  import PageComponent from "$lib/components/Page.svelte";
  import { g } from "$lib/global.svelte";
</script>

{#if g.page}
  <PageComponent page={g.page} />
  <!-- Referenced pages, etc. -->
{/if}
