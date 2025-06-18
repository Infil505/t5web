<template>
  <div class="sidebar-section">
    <div class="sidebar-header" @click="toggleExpand">
      {{ title }}
    </div>

    <div v-if="isExpanded" class="sidebar-content">
      <div class="sidebar-buttons">
        <button class="custom-button" @click="$emit('new-item')">
          Nuevo
        </button>
        <button 
          class="custom-button" 
          :disabled="!selectedItem"
          @click="deleteSelected"
        >
          Borrar
        </button>
      </div>
      <div class="sidebar-list">
        <div 
          v-for="item in items" 
          :key="item.id" 
          class="sidebar-item" 
          :class="{ selected: selectedItem?.id === item.id }"
          @click="selectItem(item)"
        >
          {{ item.nombre || item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarSection',
  props: {
    title: String,
    items: Array
  },
  emits: ['new-item', 'delete-item', 'select-item'],
  data() {
    return {
      isExpanded: true,
      selectedItem: null
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    selectItem(item) {
      this.selectedItem = item
      this.$emit('select-item', item)
    },
    deleteSelected() {
      if (this.selectedItem) {
        this.$emit('delete-item', this.selectedItem)
        this.selectedItem = null
      }
    }
  }
}
</script>

<style scoped>
.sidebar-section {
  border-bottom: 1px solid #333;
}

.sidebar-header {
  background-color: #90EE90;
  padding: 8px;
  border-bottom: 1px solid #333;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.sidebar-content {
  padding: 5px;
  min-height: 120px;
}

.sidebar-buttons {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.sidebar-list {
  max-height: 100px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background: white;
}

.sidebar-item {
  padding: 4px 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.sidebar-item:hover {
  background-color: #e0e0e0;
}

.sidebar-item.selected {
  background-color: #90EE90;
}

.custom-button {
  padding: 6px 12px;
  border: 2px solid #333;
  background-color: #e0e0e0;
  cursor: pointer;
  font-size: 12px;
}

.custom-button:hover {
  background-color: #d0d0d0;
}
</style>
