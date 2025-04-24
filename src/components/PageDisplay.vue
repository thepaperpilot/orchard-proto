<template>
  <h1>{{ page.name }}</h1>
  <Suspense>
    <BlockDisplay v-for="block in items" :block="block" />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Page } from '../sdk';
import Loading from './Loading.vue';

const { page } = defineProps<{
  page: Page;
}>();

const items = computed(async () => await page.blocks.items())
</script>
