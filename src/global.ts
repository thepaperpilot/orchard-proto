import { EntityId, EntityIdStr, Peer, StorageManager } from "@muni-town/leaf";
import { indexedDBStorageAdapter } from "@muni-town/leaf-storage-indexeddb";
import { Orchard } from "./sdk/index.ts";

// TODO add syncer
const peer = new Peer(
  new StorageManager(
    indexedDBStorageAdapter("orchard-01JSJ8EG5JPZ24EXYKG0B0RA2Q")
  )
);

const catalogId =
  localStorage.getItem("orchard.01JSJ8A603V40GKM9CWTTG75TV.catalog") ??
  new EntityId().toString();

export const orchard = await Orchard.init(peer, catalogId as EntityIdStr);
