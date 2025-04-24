<template>
  <Suspense>
    <Today />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
  <!-- TODO items -->
  <!-- Other journal days, in infinite scroll -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Loading from '../components/Loading.vue';
import Today from '../components/Today.vue';
import { orchard } from '../global';
import { Page } from '../sdk';

const day = new Date().toDateString();
const page = ref<Page>();
if (orchard.journal.has(day)) {
  page.value = await orchard.journal.get(day) ?? undefined;
} else {
  const newPage = await orchard.create(Page);
  newPage.name = day;
  orchard.journal.set(day, newPage);
  page.value = newPage;
}
</script>
