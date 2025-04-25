import type { EntityIdStr } from "@muni-town/leaf";
import { defComponent } from "@muni-town/leaf";
import { LoroDoc, LoroMap, LoroMovableList } from "loro-crdt";

// TODO move to orchard-sdk repo

/** A list of Entity IDs for Orchard pages. */
export const Pages = defComponent(
  "pages:01JSHR6MFWBZVQZSF21680FQDM",
  LoroMovableList<EntityIdStr>
);

export const Journal = defComponent(
  "journal:01JSM44AYY45PRSSJF1XNR1FDS",
  LoroMap<Record<string, EntityIdStr>>
);

/** A list of Entity IDs for Orchard blocks. */
export const Blocks = defComponent(
  "blocks:01JSHZ0GWP425PG29MVQ85F756",
  LoroMovableList<EntityIdStr>
);

// ProseKit needs a loro doc of its own, so this component will have a nested doc
export const Content = defComponent(
  "content:01JSMW46QAADZH6E3XZP39E8DW",
  LoroDoc
);
