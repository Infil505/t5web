
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
      <h3>Autores relacionados</h3>

      <div v-for="autor in autoresDelLibro" :key="autor.id" class="author-card">
        <div class="author-info">
          <div class="info-row">
            <span class="info-label">Nombre:</span>
            <span class="info-value">{{ autor.nombre }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Nacionalidad:</span>
            <span class="info-value">{{ autor.nacionalidad }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Géneros:</span>
            <span class="info-value">{{ autor.generos.join(', ') }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Seudónimo:</span>
            <span class="info-value">{{ autor.seudonimo }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel LIBRO -->
    <div v-if="activeTab === 'libro'" class="detail-form">
      <h3>Detalle de libro</h3>

      <div class="form-row">
        <div class="form-group full-width">
          <label>Nombre:</label>
          <input v-model="libro.nombre" class="form-input-wide" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group full-width">
          <label>ISBN:</label>
          <input v-model="libro.isbn" class="form-input-wide" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Año:</label>
          <input v-model="libro.año" class="form-input" />
        </div>
        <div class="form-group">
          <label>Edición:</label>
          <select v-model="libro.edicion" class="form-select">
            <option v-for="e in editions" :key="e" :value="e">{{ e }}</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Editorial:</label>
          <span class="editorial-display">{{ editorialNombre }}</span>
          <button class="action-btn secondary">
            Cambiar editorial
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group full-width">
          <label>Autores:</label>
          <div class="authors-section">
            <div class="authors-list">
              <div 
                v-for="id in libro.autores" 
                :key="id" 
                class="author-item"
              >
                {{ getAutorNombre(id) }}
              </div>
            </div>
            <div class="authors-buttons">
              <button class="action-btn">
                Agregar autor
              </button>
              <button class="action-btn secondary">
                Eliminar autor
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones finales -->
      <div class="action-buttons">
        <button class="btn-cancel">Cancel</button>
        <button class="btn-ok">OK</button>
      </div>
    </div>

    <!-- Panel EDITORIAL -->
    <div v-if="activeTab === 'editorial'" class="detail-form">
      <h3>Datos de la editorial</h3>

      <div class="editorial-info">
        <div class="info-row">
          <span class="info-label">Nombre:</span>
          <span class="info-value">{{ editorial.nombre }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">País:</span>
          <span class="info-value">{{ editorial.pais }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Año fundación:</span>
          <span class="info-value">{{ editorial.añoFundacion }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Especialidad:</span>
          <span class="info-value">{{ editorial.especialidad }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { libraryStore } from '../stores/library.js'

// --- Estado de pestaña activa
const activeTab = ref('libro')

// --- Datos de libro seleccionado
const route = useRoute()
const libro = computed(() => {
  const id = parseInt(route.query.id)
  return libraryStore.libros.find(l => l.id === id) || libraryStore.libros[0]
})

// --- Editorial vinculada
const editorial = computed(() =>
  libraryStore.editoriales.find(e => e.id === libro.value.editorialId) || {}
)
const editorialNombre = computed(() => editorial.value.nombre || 'Desconocida')

// --- Autores vinculados
const autoresDelLibro = computed(() =>
  libro.value.autores.map(id => libraryStore.autores.find(a => a.id === id))
)
function getAutorNombre(id) {
  const a = libraryStore.autores.find(x => x.id === id)
  return a ? a.nombre : 'Desconocido'
}

// --- Utilidades
const editions = ['1', '2', '3', '4', '5']
</script>

<style scoped>
.library-system {
  font-family: Arial, sans-serif;
  border: 2px solid #000;
  background: #f0f0f0;
  min-height: 100vh;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
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
  font-size: 14px;
}

.tab.active {
  background: white;
  border-bottom: 2px solid white;
  margin-bottom: -2px;
  font-weight: bold;
}

.tab:hover:not(.active) {
  background: #e8e8e8;
}

.detail-form {
  padding: 16px;
  background: white;
}

.detail-form h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: bold;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 12px;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.form-group.full-width {
  flex: 1 1 100%;
}

.form-group label {
  font-weight: bold;
  min-width: 80px;
  font-size: 14px;
}

.form-input,
.form-select {
  padding: 4px 8px;
  border: 2px solid #000;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.form-input-wide {
  padding: 4px 8px;
  border: 2px solid #000;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.editorial-display {
  color: #1976d2;
  text-decoration: underline;
  font-size: 14px;
  margin-right: 8px;
}

.action-btn {
  padding: 4px 12px;
  border: 2px solid #000;
  background: white;
  cursor: pointer;
  font-size: 12px;
  margin-left: 4px;
}

.action-btn.secondary {
  background: #e0e0e0;
}

.action-btn:hover {
  background: #f3f4f6;
}

.authors-section {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.authors-list {
  border: 2px solid #000;
  padding: 8px;
  height: 120px;
  width: 200px;
  overflow-y: auto;
  flex-shrink: 0;
}

.author-item {
  background: white;
  border: 1px solid #000;
  padding: 2px 4px;
  margin-bottom: 2px;
  font-size: 12px;
}

.authors-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}

.btn-cancel,
.btn-ok {
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

.btn-cancel:hover,
.btn-ok:hover {
  background: #f3f4f6;
}

/* Estilos para las cards de autores */
.author-card {
  border: 2px solid #000;
  margin-bottom: 12px;
  padding: 8px;
}

.author-info {
  background: white;
  border: 1px solid #000;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.info-row {
  display: flex;
  min-width: 300px;
  font-size: 14px;
  margin-bottom: 4px;
}

.info-label {
  font-weight: bold;
  min-width: 100px;
}

.info-value {
  flex: 1;
}

/* Estilos para la sección editorial */
.editorial-info {
  border: 2px solid #000;
  background: #f8f8f8;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  .form-group {
    width: 100%;
  }

  .authors-section {
    flex-direction: column;
  }

  .authors-list {
    width: 100%;
  }

  .author-info,
  .editorial-info {
    flex-direction: column;
  }
}

</style>