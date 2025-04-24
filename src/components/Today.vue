<template>
  <PageDisplay :page="page" />
</template>

<script setup lang="ts">
import { orchard } from '../global';
import { Page } from '../sdk';

const day = new Date().toDateString();
let page;
if (orchard.journal.has(day)) {
  page = (await orchard.journal.get(day))!;
} else {
  const newPage = await orchard.create(Page);
  newPage.name = day;
  orchard.journal.set(day, newPage);
  page = newPage;
}
</script>