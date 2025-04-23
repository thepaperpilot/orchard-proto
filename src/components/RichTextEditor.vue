<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" style="outline: auto; padding: 1rem" />
  </ProseKit>
</template>

<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { defineLoro } from 'prosekit/extensions/loro'
import { ProseKit } from 'prosekit/vue'
import {
  CursorAwareness,
} from 'loro-prosemirror'
import {
  ref,
  watchPostEffect,
} from 'vue'
import type { Block } from '../sdk'

const { block } = defineProps<{
  block: Block
}>();

const awareness = new CursorAwareness(block.doc.peerIdStr)
const extension = defineLoro({ doc: block.doc, awareness })
const editor = createEditor({ extension })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>