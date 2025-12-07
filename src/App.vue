<!-- src/App.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchUsers } from './composables/useFetchUsers';
import type { User } from './types';
import Controls from './components/Controls.vue';
import UserList from './components/UserList.vue';

// Данные
const users = ref<User[]>([]);
const loading = ref(true);

// Фильтрация от Controls
const showAdultsOnly = ref(false);
const sortBy = ref<'name' | 'age'>('name');

// Загрузка
onMounted(async () => {
  try {
    users.value = await fetchUsers();
  } catch (err) {
    console.error('Ошибка загрузки:', err);
  } finally {
    loading.value = false;
  }
});

// Обработка обновления списка (например, фото)
const handleUsersUpdate = (updatedUsers: User[]) => {
  users.value = updatedUsers;
};

// Обработка изменения фильтров
const handleFilterUpdate = ({ showAdultsOnly: sao, sortBy: sb }: { showAdultsOnly: boolean; sortBy: 'name' | 'age' }) => {
  showAdultsOnly.value = sao;
  sortBy.value = sb;
};
</script>

<template>
  <div class="app">
    <h1>Список пользователей</h1>

    <div v-if="loading">Загрузка...</div>

    <template v-else>
      <Controls @update:filter="handleFilterUpdate" />

      <UserList
        :users="users"
        :show-adults-only="showAdultsOnly"
        :sort-by="sortBy"
        @update:users="handleUsersUpdate"
      />
    </template>
  </div>
</template>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 24px;
}
</style>