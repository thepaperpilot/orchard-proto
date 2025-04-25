import { indexedDBStorageAdapter } from "@muni-town/leaf-storage-indexeddb";
import { SveltePeer } from "@muni-town/leaf-svelte";
import {
  EntityId,
  type EntityIdStr,
  StorageManager
} from "@roomy-chat/sdk";

import { page } from "$app/state";
import { untrack } from "svelte";

import * as roomy from "@roomy-chat/sdk";
import { Orchard, Page } from "../sdk";
import { browser } from "$app/environment";

if (browser) {
  (window as any).r = roomy;
  (window as any).page = page;
}

// Reload app when this module changes to prevent accumulated connections.
if (browser && import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

export let g = $state({
  orchard: undefined as Orchard | undefined,
  loadedPage: undefined as string | undefined,
  page: undefined as Page | undefined,
});
(globalThis as any).g = g;

initOrchard().then((orchard) => (g.orchard = orchard));

$effect.root(() => {
  /** Update the global page when the route changes. */
  $effect(() => {
    page.url.pathname;
    page.params.page;
    if (!g.orchard) return;

    untrack(() => {
      if (page.params.page) {
        g.orchard?.open(Page, page.params.page as EntityIdStr).then((page) => {
          g.loadedPage = page.id;
          g.page = page;
        });
      }
    });
  });
});

async function initOrchard(): Promise<Orchard> {
  const catalogId =
    localStorage.getItem("orchard.01JSJ8A603V40GKM9CWTTG75TV.catalog") ??
    new EntityId().toString();

  const peer = new SveltePeer(
    new StorageManager(
      indexedDBStorageAdapter("orchard-01JSJ8EG5JPZ24EXYKG0B0RA2Q"),
    ),
    // TODO add syncer
    // await webSocketSyncer(websocket),
  );

  return await Orchard.init(peer, catalogId as EntityIdStr);
}
