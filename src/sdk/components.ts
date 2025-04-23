import type { EntityIdStr } from '@muni-town/leaf';
import { defComponent, LoroMovableList } from '@muni-town/leaf';

// TODO move to orchard-sdk repo

/** A list of Entity IDs for Orchard pages. */
export const Pages = defComponent('pages:01JSHR6MFWBZVQZSF21680FQDM', LoroMovableList<EntityIdStr>);

/** A list of Entity IDs for Orchard blocks. */
export const Blocks = defComponent(
  'blocks:01JSHZ0GWP425PG29MVQ85F756',
  LoroMovableList<EntityIdStr>,
);
