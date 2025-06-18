<template>
  <div class="library-system">
    <div class="tabs">
      <div 
        class="tab" 
        :class="{ active: activeTab === 'autor' }" 
        @click="activeTab = 'autor'"
      >
        Autor
      </div>
      <div 
        class="tab" 
        :class="{ active: activeTab === 'libro' }" 
        @click="activeTab = 'libro'"
      >
        Libro
      </div>
      <div 
        class="tab" 
        :class="{ active: activeTab === 'editorial' }" 
        @click="activeTab = 'editorial'"
      >
        Editorial
      </div>
    </div>

    <!-- Panel AUTOR -->
    <div v-if="activeTab === 'autor'" class="detail-form">
      <h3>Detalle de autor</h3>

      <div class="form-row">
        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="autor.nombre" class="form-input" />
        </div>
        <div class="form-group">
          <label>Ocupación:</label>
          <input v-model="autor.ocupacion" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Nacionalidad:</label>
          <input v-model="autor.nacionalidad" class="form-input" />
        </div>
        <div class="form-group">
          <label>Seudónimo:</label>
          <input v-model="autor.seudonimo" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group full-width">
          <label>Géneros:</label>
          <input v-model="autor.generos" class="form-input" />
        </div>
      </div>
    </div>

    <!-- Panel LIBRO -->
    <div v-if="activeTab === 'libro'" class="detail-form">
      <h3>Libros escritos por {{ autor.nombre }}</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ISBN</th>
            <th>Año</th>
            <th>Edición</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="libro in librosDelAutor" :key="libro.id">
            <td>{{ libro.nombre }}</td>
            <td>{{ libro.isbn }}</td>
            <td>{{ libro.año }}</td>
            <td>{{ libro.edicion }}{{ getOrdinalSuffix(libro.edicion) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Panel EDITORIAL -->
    <div v-if="activeTab === 'editorial'" class="detail-form">
      <h3>Editoriales de los libros de {{ autor.nombre }}</h3>
      <div v-for="editorial in editorialesDelAutor" :key="editorial.id" class="editorial-info">
        <div class="info-row"><span class="info-label">Nombre:</span> {{ editorial.nombre }}</div>
        <div class="info-row"><span class="info-label">País:</span> {{ editorial.pais }}</div>
        <div class="info-row"><span class="info-label">Año fundación:</span> {{ editorial.añoFundacion }}</div>
        <div class="info-row"><span class="info-label">Especialidad:</span> {{ editorial.especialidad }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { libraryStore } from '../stores/library.js'

// Estado de pestaña
const activeTab = ref('autor')

// Obtener autor desde query param
const route = useRoute()
const autor = computed(() => {
  const id = parseInt(route.query.id)
  return libraryStore.autores.find(a => a.id === id) || {}
})

// Libros del autor
const librosDelAutor = computed(() =>
  libraryStore.libros.filter(libro =>
    libro.autores.includes(autor.value.id)
  )
)

// Editoriales de los libros del autor
const editorialesDelAutor = computed(() => {
  const ids = librosDelAutor.value.map(libro => libro.editorialId)
  const unicos = [...new Set(ids)]
  return libraryStore.editoriales.filter(e => unicos.includes(e.id))
})

function getOrdinalSuffix(num) {
  if (num === 1) return 'era'
  if (num === 2) return 'da'
  if (num === 3) return 'era'
  return 'ta'
}
</script>

<style scoped>
.library-system {
  font-family: Arial, sans-serif;
  border: 2px solid #000;
  background: #f0f0f0;
  height: 100vh;
}

.header {
  background: #d0d0d0;
  padding: 8px 16px;
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.main-layout {
  display: flex;
  height: calc(100vh - 40px);
}

.sidebar {
  width: 250px;
  border-right: 2px solid #000;
  background: #f8f8f8;
}

.section {
  border-bottom: 1px solid #000;
}

.section-header {
  background: #90EE90;
  padding: 8px 12px;
  font-weight: bold;
  border-bottom: 1px solid #000;
}

.button-row {
  padding: 8px;
  display: flex;
  gap: 4px;
}

.action-btn {
  padding: 4px 12px;
  border: 2px solid #000;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

.action-btn.secondary {
  background: #e0e0e0;
}

.list-container {
  max-height: 150px;
  overflow-y: auto;
  border-bottom: 1px solid #000;
}

.list-item {
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.list-item:hover {
  background: #e8e8e8;
}

.list-item.active {
  background: #90EE90;
}

.content-area {
  flex: 1;
  background: white;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #000;
}

.tab {
  padding: 8px 20px;
  border-right: 2px solid #000;
  cursor: pointer;
  background: #f0f0f0;
}

.tab.active {
  background: white;
  border-bottom: 2px solid white;
  margin-bottom: -2px;
}

.detail-form {
  padding: 16px;
}

.detail-form h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group.full-width {
  flex: 1;
}

.form-group label {
  font-weight: bold;
  min-width: 80px;
}

.form-input, .form-select {
  padding: 4px 8px;
  border: 2px solid #000;
  font-size: 14px;
}

.form-input {
  width: 120px;
}

.form-select {
  width: 140px;
}

.genre-display {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
  max-width: 200px;
}

.genre-chip {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #bbdefb;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-chip {
  cursor: pointer;
  font-weight: bold;
  color: #666;
}

.remove-chip:hover {
  color: #f44336;
}

.books-table {
  margin: 20px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #000;
}

.data-table th,
.data-table td {
  border: 1px solid #000;
  padding: 6px 12px;
  text-align: left;
}

.data-table th {
  background: #f0f0f0;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.btn-cancel, .btn-ok {
  padding: 6px 16px;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  background: white;
}

.btn-ok {
  background: #f0f0f0;
}
</style>