import type {
  ComponentDef,
  Entity,
  EntityIdStr,
  IntoEntityId,
  Peer,
} from "@muni-town/leaf";
import { intoEntityId } from "@muni-town/leaf";
import {
  type EntityConstructor,
  EntityList,
  EntityWrapper,
  components as roomyComponents,
} from "@roomy-chat/sdk";
import { LoroMap } from "@muni-town/leaf";
import loroProseMirror from "loro-prosemirror";
import { Blocks, Content, Journal, Pages } from "./components";

export type LoroDocType = loroProseMirror.LoroDocType;

export class EntityMap<
  T extends EntityWrapper,
  L extends LoroMap<Record<string, EntityIdStr>> = LoroMap<
    Record<string, EntityIdStr>
  >,
> extends EntityWrapper {
  #def: ComponentDef<L>;
  #factory: EntityConstructor<T>;

  constructor(
    peer: Peer,
    entity: Entity,
    component: ComponentDef<L>,
    constructor: EntityConstructor<T>
  ) {
    super(peer, entity);
    this.#def = component;
    this.#factory = constructor;
  }

  get size() {
    return this.entity.getOrInit(this.#def, (x) => x.size);
  }

  keys(): string[] {
    return this.entity.getOrInit(this.#def, (x) => x.keys());
  }

  values(): EntityIdStr[] {
    return this.entity.getOrInit(this.#def, (x) => x.values());
  }

  async entities(): Promise<T[]> {
    return await Promise.all(
      this.entity.getOrInit(this.#def, (x) =>
        x
          .values()
          .map(
            async (key) =>
              new this.#factory(this.peer, await this.peer.open(x.get(key)))
          )
      )
    );
  }

  async entries(): Promise<[string, T][]> {
    return await Promise.all(
      this.entity.getOrInit(this.#def, (x) =>
        x
          .keys()
          .map(async (key) => [
            key,
            new this.#factory(this.peer, await this.peer.open(x.get(key))),
          ])
      )
    );
  }

  async items(): Promise<Record<string, T>> {
    return (await this.entries()).reduce(
      (acc, [key, entity]) => ({ ...acc, [key]: entity }),
      {}
    );
  }

  has(key: string): boolean {
    return this.entity.getOrInit(this.#def, (x) => x.get(key)) == null;
  }

  async get(key: string): Promise<T | null> {
    return await this.entity.getOrInit(
      this.#def,
      async (x) =>
        new this.#factory(this.peer, await this.peer.open(x.get(key)))
    );
  }

  getId(key: string): EntityIdStr | null {
    return this.entity.getOrInit(this.#def, (x) => x.get(key));
  }

  set(key: string, item: EntityIdStr | T) {
    this.entity.getOrInit(this.#def, (x) =>
      x.set(key, typeof item === "string" ? item : item.entity.id.toString())
    );
  }

  remove(key: string) {
    this.entity.getOrInit(this.#def, (x) => x.delete(key));
  }

  delete() {
    this.entity.delete(this.#def);
  }
}

// TODO Wrapper to make these reactive?
export class Orchard extends EntityWrapper {
  static async init(peer: Peer, catalogId: IntoEntityId) {
    const catalog = await peer.open(intoEntityId(catalogId));
    return new Orchard(peer, catalog);
  }

  get pages(): EntityList<Page> {
    return new EntityList(this.peer, this.entity, Pages, Page);
  }

  get journal(): EntityMap<Page> {
    return new EntityMap(this.peer, this.entity, Journal, Page);
  }
}

export class Page extends EntityWrapper {
  get name(): string {
    return this.entity.getOrInit(roomyComponents.BasicMeta, (x) =>
      x.get("name")
    );
  }
  set name(name: string) {
    this.entity.getOrInit(roomyComponents.BasicMeta, (x) =>
      x.set("name", name)
    );
  }

  get blocks(): EntityList<Block> {
    return new EntityList(this.peer, this.entity, Blocks, Block);
  }
}

export class Block extends EntityWrapper {
  get content(): LoroDocType {
    return this.entity.getOrInit(Content, (x) => x as LoroDocType);
  }

  get blocks(): EntityList<Block> {
    return new EntityList(this.peer, this.entity, Blocks, Block);
  }
}
