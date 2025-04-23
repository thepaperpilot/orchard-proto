import type { IntoEntityId, LoroText, Peer } from '@muni-town/leaf';
import { intoEntityId } from '@muni-town/leaf';
import { EntityList, EntityWrapper, components as roomyComponents } from '@roomy-chat/sdk';
import { Blocks, Pages } from './components';

export class Orchard extends EntityWrapper {
  static async init(peer: Peer, catalogId: IntoEntityId) {
    const catalog = await peer.open(intoEntityId(catalogId));
    return new Orchard(peer, catalog);
  }

  get pages(): EntityList<Page> {
    return new EntityList(this.peer, this.entity, Pages, Page);
  }
}

export class Page extends EntityWrapper {
  get name(): string {
    return this.entity.getOrInit(roomyComponents.BasicMeta, (x) => x.get('name'));
  }
  set name(name: string) {
    this.entity.getOrInit(roomyComponents.BasicMeta, (x) => x.set('name', name));
  }

  get blocks(): EntityList<Block> {
    return new EntityList(this.peer, this.entity, Blocks, Block);
  }
}

export class Block extends EntityWrapper {
  body<R>(handler: (x: LoroText) => R): R {
    return this.entity.getOrInit(roomyComponents.Content, handler);
  }

  get blocks(): EntityList<Block> {
    return new EntityList(this.peer, this.entity, Blocks, Block);
  }
}
