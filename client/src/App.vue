<script setup lang="ts">
import { defineComponent, ref, Ref } from "vue";
import Header from "./components/layout/Header.vue";
import Navigation from "./components/layout/Navigation.vue"
import { useAuthStore } from "./stores/auth";
import { useUserStore } from "./stores/user"; 

defineComponent({
  name: "App",
});

const authStore = useAuthStore();
const userStore = useUserStore();

if(localStorage.getItem('access_token')) authStore.signIn();
// if(authStore.loggedIn) userStore.getUser().catch(e => console.error(e));

</script>

<template>
  <v-app id="inspire">
    <Header />
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<style lang="scss">
$base-color: #367dbf;
// @import '~vue-advanced-cropper/dist/theme.classic.scss';

/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
  background-repeat: inherit !important;
}

.cropper-wrapper {
  overflow: hidden;
  position: relative;
  height: 700px;
  background: black;
}
.cropper-background {
  background: none !important;
}
.image-background {
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  left: -10px;
  top: -10px;
}

.image {
  border-radius: 20px;
}

.btn.white.change {
  width: 40px;
  margin: 10px;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;

  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }
}

a {
  color: #ccc !important;
}

.bar-title {
  color: white;
  font-weight: 500;
}

/*Сайдбар*/
.toolbar-list {
  height: calc(100% - 137px);
  background-color: #33393d !important;
}

.toolbar-link {
  width: 100%;
  text-decoration: none;
  display: flex;
}

.user-name {
  color: white;
}

.link-list {
  color: white !important;
}

.active {
  background: rgba(0, 0, 0, 0.6);
}
</style>
