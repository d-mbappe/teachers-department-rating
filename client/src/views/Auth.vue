<script setup lang="ts">
import { ref, Ref, reactive, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();

const authStore = useAuthStore();

const signInForm: Ref<HTMLFormElement | null> = ref(null);
const signUpForm: Ref<HTMLFormElement | null> = ref(null);
const modelForm = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  roles: [],
});

const regActive: Ref<boolean> = ref(false);
const logActive: Ref<boolean> = ref(true);
const valid: Ref<boolean> = ref(true);
const e1: Ref<boolean> = ref(true);

const usernameRules = reactive([(v: string) => !!v || "Логин обязателен"]);
const passwordRules = reactive([(v: string) => !!v || "Пароль обязателен"]);
const confirmPasswordIsSame = () => {
  return (
    modelForm.password === modelForm.confirmPassword ||
    "Пароли должны совпадать"
  );
};
const confirmPasswordRules = reactive([
  ...passwordRules,
  confirmPasswordIsSame,
]);

const { roles } = storeToRefs(authStore);

const changeForm = (e: Event) => {
  const eventTarget = e.target as HTMLInputElement;

  if (eventTarget.id === "reg") {
    regActive.value = true;
    logActive.value = false;
  } else {
    regActive.value = false;
    logActive.value = true;
  }
};

const signIn = async () => {
  const { valid } = await signInForm.value?.validate();

  if (valid) {
    await authStore.authSignIn(modelForm.username, modelForm.password);
    
    router.push("/profile");
  }
};

const signUp = async () => {
  const { valid } = await signUpForm.value?.validate();

  if (valid) {
    try {
      const { confirmPassword, ...data } = modelForm;
      await authStore.authSignUp(data);

      router.push("/profile");
    } catch (error) {
      console.error(error)
    }

  }
};
onMounted(async () => {
  await authStore.getRoles();
});
</script>

<template>
  <v-app>
    <main>
      <v-row justify="center" no-gutters>
        <v-col align-self="center" cols="6">
          <v-container class="pt-10">
            <v-toolbar color="primary" class="pl-3" rounded>
              <v-row id="auth-header" class="pl-3">
                <button
                  id="log"
                  text
                  class="auth-btn"
                  :class="{ 'active-name': logActive }"
                  @click="changeForm($event)"
                >
                  Вход
                </button>
                <button
                  id="reg"
                  text
                  class="auth-btn"
                  :class="{ 'active-name': regActive }"
                  @click="changeForm($event)"
                >
                  Регистрация
                </button>
              </v-row>
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <div>
                  <!-- Вход -->
                  <v-form
                    v-if="logActive"
                    :model-value="valid"
                    @submit.prevent="signIn"
                    ref="signInForm"
                  >
                    <v-text-field
                      class="mb-2"
                      label="Введи логин"
                      v-model="modelForm.username"
                      :rules="usernameRules"
                      required
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      label="Введите пароль"
                      v-model="modelForm.password"
                      min="8"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
                      variant="outlined"
                    ></v-text-field>
                    <v-layout class="mt-10 justify-space-between">
                      <v-btn
                        @click="signIn"
                        :disabled="!valid"
                        color="blue darken-4 white--text"
                        >Войти</v-btn
                      >
                      <a href="">Забыли пароль?</a>
                    </v-layout>
                  </v-form>
                  <!-- Регистрация -->
                  <v-form
                    v-if="regActive"
                    @submit.prevent="signUp"
                    :model-value="valid"
                    ref="signUpForm"
                  >
                    <v-text-field
                      class="mb-2"
                      label="Введи логин"
                      v-model="modelForm.username"
                      :rules="usernameRules"
                      required
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      class="mb-2"
                      label="Введи email"
                      v-model="modelForm.email"
                      :rules="usernameRules"
                      required
                      variant="outlined"
                    ></v-text-field>
                    <v-select
                      v-model="modelForm.roles"
                      :items="roles"
                      placeholder="Выберите значение"
                      item-value="name"
                      label="Выберите роль"
                      variant="outlined"
                      multiple
                    ></v-select>
                    <v-text-field
                      v-model="modelForm.password"
                      class="mb-2"
                      label="Введите пароль"
                      min="8"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Подтвердите пароль"
                      v-model="modelForm.confirmPassword"
                      min="8"
                      :type="e1 ? 'password' : 'text'"
                      :rules="confirmPasswordRules"
                      counter
                      required
                      variant="outlined"
                    ></v-text-field>
                    <v-layout class="mt-10 justify-space-between">
                      <v-btn
                        @click="signUp"
                        :disabled="!valid"
                        color="blue darken-4 white--text"
                        >Войти</v-btn
                      >
                      <a href="">Забыли пароль?</a>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </main>
  </v-app>
</template>

<style lang="scss">
#auth-header {
  .auth-btn {
    color: white;
    text-transform: none;
    font-size: 18px;
    opacity: 0.8;

    margin-right: 20px;

    &:before {
      background-color: inherit;
    }

    &.active-name {
      opacity: 1;
      font-size: 24px;
    }
  }
}
</style>