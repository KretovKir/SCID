<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { User, SortBy } from '../types';
  import UserCard from './UserCard.vue';

  const props = defineProps<{
    users: User[];
    showAdultsOnly: boolean;
    sortBy: SortBy;
  }>();

  const emit = defineEmits<{ (e: 'update:users', users: User[]): void }>();

  // Внутренняя копия для реактивности
  const internalUsers = ref<User[]>([...props.users]);

  // Следим за внешними изменениями списка
  watch(() => props.users, (newUsers) => {
    internalUsers.value = [...newUsers];
  });

  // Фильтрация + сортировка — полностью внутри компонента
  const displayedUsers = computed(() => {
    let list = internalUsers.value;

    if (props.showAdultsOnly) {
      list = list.filter(u => u.age >= 18);
    }

    return [...list].sort((a, b) => {
      if (props.sortBy === 'name') {
        return a.name.localeCompare(b.name, 'ru');
      } else {
        return a.age - b.age;
      }
    });
  });

  // Обработка обновления пользователя из карточки
  const handleUserUpdate = (updatedUser: User) => {
    const index = internalUsers.value.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      internalUsers.value[index] = updatedUser;
      // Эмитим обновлённый список наверх
      emit('update:users', [...internalUsers.value]);
    }
  };
</script>

<template>
  <div class="user-list">
    <UserCard
      v-for="user in displayedUsers"
      :key="user.id"
      :user="user"
      @update:user="handleUserUpdate"
    />
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>