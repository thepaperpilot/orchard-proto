<script lang="ts">
  import PageComponent from "$lib/components/Page.svelte";
  import { g } from "$lib/global.svelte";
  import { untrack } from "svelte";
  import { Page } from "../sdk";
  import { derivePromise } from "$lib/utils.svelte";

  let today = $state<Page>();

  let pages = derivePromise(
    [],
    async () =>
      await g.orchard?.journal
        .entities()
        .then((pages) =>
          pages.filter((page) => page !== today && page.blocks.length > 0),
        ),
  );

  $effect(() => {
    const orchard = g.orchard;
    if (orchard && today == null) {
      untrack(async () => {
        const day = new Date().toDateString();
        if (orchard.journal.has(day)) {
          today = (await orchard.journal.get(day)) ?? undefined;
        } else {
          const newPage = await orchard.create(Page);
          newPage.name = day;
          orchard.journal.set(day, newPage);
          today = newPage;
        }
      });
    }
  });
</script>

{#if today}
  <PageComponent page={today} />
{/if}
<!-- TODO items -->

<!-- Make this window or infinite scroll -->
{#each pages.value ?? [] as page}
  <PageComponent {page} />
{/each}
