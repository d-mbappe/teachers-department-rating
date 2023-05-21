<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.signOut();
  router.push('/auth');

}
</script>

<template>
  <v-system-bar app color="primary">
    <span class="bar-title">ДонНТУ Кафедра ИИСА</span>
    <v-spacer></v-spacer>

    <router-link class="mr-5" to="/auth" @click.prevent="logout">Выйти</router-link>
    <router-link class="mr-5" to="/">Домой</router-link>

    <v-icon>mdi-square</v-icon>

    <v-icon>mdi-circle</v-icon>

    <v-icon>mdi-triangle</v-icon>
  </v-system-bar>
</template>

<style>

</style>