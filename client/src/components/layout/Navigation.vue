<script setup lang="ts">
import { ref, Ref } from "vue";

const drawer: Ref<boolean | null> = ref(null);

const links: Array<string[]> = [
                ['mdi-account', 'Личные данные', '/profile'],
                ['mdi-format-list-bulleted', 'Сотрудники', '/employee'],
                ['mdi-file-document', 'Учебная литература', '/educational-literature'],
                ['mdi-table-account', 'Расписание', '/schedule'],
                ['mdi-file-link', 'Научные работы', '/scientific-work'],
            ];

</script>

<template>
  <v-navigation-drawer v-model="drawer" app v-if="$route.path !== '/auth'">
    <v-sheet color="primary" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-3" size="64">
        <!-- <img  v-if="avatar"
                        :src="avatar"
                        alt="avatar"
                  >
                  <img  v-else
                        src="./assets/icons/avatar_logo.svg"
                        class="pa-2"
                        alt="avatar"
                  > -->
      </v-avatar>

      <div class="user-name">Решетняк Даниил</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list class="toolbar-list">

              <v-list-item
                      v-for="[icon, text, path] in links"
                      :key="icon"
                      link
                      :to="path"
                      active-class="active"
              >

                      <v-list-item-icon>
                          <v-icon :color="$router.currentRoute.path === path ? 'primary' : 'white'" >{{ icon}}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                          <v-list-item-title active-class="active-class" class="link-list">{{ text }}</v-list-item-title>
                      </v-list-item-content>
              </v-list-item>
          </v-list> 
  </v-navigation-drawer>
</template>

<style>
/*Сайдбар*/
.toolbar-list {
  height: calc(100% - 137px);
 /* background-color: #33393d !important;*/
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