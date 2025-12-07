<script setup lang="ts">
  import { ref } from 'vue';
  import type { SortBy } from '../types';

  const showAdultsOnly = ref(false);
  const sortBy = ref<SortBy>('name');

  const emit = defineEmits<{
    (e: 'update:filter', value: { showAdultsOnly: boolean; sortBy: SortBy }): void;
  }>();


  const updateFilter = () => {
    emit('update:filter', { showAdultsOnly: showAdultsOnly.value, sortBy: sortBy.value });
  };
</script>

<template>
  <div class="controls">
    <div> Сортировать по: </div>
    <div>
      <input type="checkbox" v-model="showAdultsOnly" @change="updateFilter" />
      Пользователи старше 18 лет
    </div>

    <div class="sort-group">
      <div>
        <input
          type="radio"
          name="sort"
          value="name"
          v-model="sortBy"
          @change="updateFilter"
        />
        По имени
      </div>
      <div>
        <input
          type="radio"
          name="sort"
          value="age"
          v-model="sortBy"
          @change="updateFilter"
        />
        По возрасту
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
  align-items: center;
}
.sort-group {
  display: flex;
  gap: 12px;
}
@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>