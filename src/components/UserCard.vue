<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { User } from '../types';

  const props = defineProps<{ user: User }>();
  const emit = defineEmits<{ (e: 'update:user', user: User): void }>();

  const localUser = ref<User>({ ...props.user });

  // Если внешний user обновился — синхронизируем
  watch(() => props.user, (newUser) => {
    localUser.value = { ...newUser };
  });

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localUser.value.photo = reader.result as string;
      // Эмитим обновлённого пользователя
      emit('update:user', { ...localUser.value });
    };
    reader.readAsDataURL(file);
  };
</script>

<template>
  <div class="user-card">
    <div class="user-avatar">
      <img v-if="localUser.photo" :src="localUser.photo" :alt="localUser.name" />
      <div v-else class="avatar-placeholder">Фото</div>
    </div>
    <div class="user-info">
      <p>Имя: {{ localUser.name }}</p>
      <p>Возраст: {{ localUser.age }}</p>
      <p>Email: {{ localUser.email }}</p>
      <input type="file" @change="handleFileChange" accept="image/*" text="Выберите фото профиля"/>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  gap: 30px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  align-items: flex-start;
}
.user-avatar img, .avatar-placeholder {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #777;
}

.user-info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-info h3 {
  margin-bottom: 8px;
  font-size: 1.2em;
}
.user-info p {
  margin-top: 0px;
  color: #555;
}
.user-info input[type='file'] {
  margin-top: 10px;
  font-size: 0.9em;
}
@media (max-width: 600px) {
  .user-card {
    flex-direction: column;
  }
  .user-avatar img,
  .avatar-placeholder {
    width: 100%;
    height: 120px;
  }
}
</style>