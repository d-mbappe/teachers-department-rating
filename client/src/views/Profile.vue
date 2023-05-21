<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted( async () => {
  await userStore.getUser();
  await userStore.getUserInfo();
})

</script>

<template>
  <v-container>
    123
  </v-container>
</template>