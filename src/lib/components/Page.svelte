<script lang="ts">
  import { derivePromise } from "$lib/utils.svelte";
  import type { Page } from "../../sdk";
  import RichTextEditor from "./RichTextEditor.svelte";

  let { page }: { page: Page } = $props();

  let blocks = derivePromise([], async () => page.blocks.items());
</script>

<h1>{page.name}</h1>
{#each blocks.value as block}
  {#key block.id}
    <RichTextEditor doc={block.content} />
  {/key}
{/each}
