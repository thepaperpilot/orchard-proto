<template>
  <PageDisplay v-if="page" :page="page" />
  <PageNotFound v-else-if="error" />
  <Loading v-else />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageDisplay from '../components/PageDisplay.vue';
import { orchard } from '../global';
import { Page } from '../sdk';

const route = useRoute()

const error = ref(false);
const page = ref<Page>();

watch(
  () => route.params.id,
  newId => {
    error.value = false;
    page.value = undefined;
    orchard.open(Page, newId)
      .then(p => page.value = p)
      .catch(() => error.value = true);
  }
)
</script>
