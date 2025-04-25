<script lang="ts">
  import { CursorAwareness } from "loro-prosemirror";
  import { createEditor } from "prosekit/core";
  import { defineLoro } from "prosekit/extensions/loro";
  import { ProseKit } from "prosekit/svelte";
  import type { LoroDocType } from "../../sdk";

  let { doc }: { doc: LoroDocType } = $props();

  const editor = createEditor({
    extension: defineLoro({
      doc,
      awareness: new CursorAwareness(doc.peerIdStr),
    }),
  });

  const mount = (element: HTMLElement) => {
    editor.mount(element);
    return { destroy: () => editor.unmount() };
  };
</script>

<ProseKit {editor}>
  <div use:mount style="outline: auto; padding: 1rem"></div>
</ProseKit>
