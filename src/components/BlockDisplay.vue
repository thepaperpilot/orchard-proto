<template>
  <RichTextEditor :doc="block.content" />
</template>

<script setup lang="ts">
import { Block } from '../sdk';
import RichTextEditor from './RichTextEditor.vue';

const { block } = defineProps<{
  block: Block;
}>();
</script>