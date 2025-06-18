
<template>
  <div class="editorial-container">
    <div class="form-card">
      <div class="form-header">
        <h2 class="form-title">
          <i class="pi pi-building"></i>
          {{ isNewMode ? 'Nueva Editorial' : 'Editar Editorial' }}
        </h2>
        <div class="form-badge" v-if="currentEditorial && !isNewMode">
          ID: {{ currentEditorial.id }}
        </div>
      </div>

      <div class="form-content">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <i class="pi pi-tag"></i>
              Nombre:
            </label>
            <InputText 
              v-model="form.nombre" 
              placeholder="Ej. Alfaguara"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">
              <i class="pi pi-globe"></i>
              País:
            </label>
            <InputText 
              v-model="form.pais" 
              placeholder="Ej. España"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <i class="pi pi-calendar"></i>
              Año de Fundación:
            </label>
            <InputText 
              v-model="form.añoFundacion" 
              placeholder="Ej. 1964"
              class="form-input"
              type="number"
            />
          </div>
          <div class="form-group">
            <label class="form-label">
              <i class="pi pi-bookmark"></i>
              Especialidad:
            </label>
            <InputText 
              v-model="form.especialidad" 
              placeholder="Ej. Literatura General"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <Button 
          label="Cancelar" 
          severity="secondary" 
          class="btn-cancel"
          @click="cancel" 
        />
        <Button 
          :label="isNewMode ? 'Crear' : 'Guardar'" 
          class="btn-ok"
          icon="pi pi-check"
          @click="save"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { libraryStore } from '../stores/library.js'

const route = useRoute()
const router = useRouter()

const form = reactive({
  nombre: '',
  pais: '',
  añoFundacion: '',
  especialidad: ''
})

const currentEditorial = ref(null)

const isNewMode = computed(() => route.query.action === 'new')

onMounted(() => {
  loadCurrentData()
})


watch(() => route.query, () => {
  loadCurrentData()
})

function loadCurrentData() {
  if (route.query.action === 'new') {
    resetForm()
  } else if (route.query.id) {
    loadEditorial(parseInt(route.query.id))
  }
}

function loadEditorial(id) {
  const editorial = libraryStore.editoriales.find(e => e.id === id)
  if (editorial) {
    currentEditorial.value = editorial
    form.nombre = editorial.nombre
    form.pais = editorial.pais
    form.añoFundacion = editorial.añoFundacion
    form.especialidad = editorial.especialidad
  }
}

function resetForm() {
  form.nombre = ''
  form.pais = ''
  form.añoFundacion = ''
  form.especialidad = ''
  currentEditorial.value = null
}

function save() {
  if (isNewMode.value) {
    const newId = Math.max(...libraryStore.editoriales.map(e => e.id)) + 1
    libraryStore.editoriales.push({
      id: newId,
      nombre: form.nombre,
      pais: form.pais,
      añoFundacion: parseInt(form.añoFundacion),
      especialidad: form.especialidad
    })
  } else {
    const index = libraryStore.editoriales.findIndex(e => e.id === currentEditorial.value.id)
    if (index !== -1) {
      libraryStore.editoriales[index] = {
        ...libraryStore.editoriales[index],
        nombre: form.nombre,
        pais: form.pais,
        añoFundacion: parseInt(form.añoFundacion),
        especialidad: form.especialidad
      }
    }
  }

  router.push('/')
}

function cancel() {
  router.push('/')
}
</script>


<style scoped>
.editorial-container {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background: #f0f0f0;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border: 2px solid #000;
  width: 100%;
  max-width: 1000px; 
  min-width: 600px;
}

.form-header {
  background: #d0d0d0;
  padding: 12px 16px;
  border-bottom: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.form-title i {
  color: #333;
}

.form-badge {
  background: #90EE90;
  color: #000;
  padding: 4px 8px;
  border: 1px solid #000;
  font-size: 12px;
  font-weight: bold;
}

.form-content {
  padding: 16px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 16px;
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 280px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  min-width: 140px;
  color: #000;
  font-size: 14px;
}

.form-label i {
  color: #333;
  font-size: 12px;
}

.form-input {
  padding: 4px 8px !important;
  border: 2px solid #000 !important;
  font-size: 14px !important;
  background: white !important;
  border-radius: 0 !important;
  flex: 1;
}

.form-input:focus {
  border-color: #000 !important;
  box-shadow: none !important;
  outline: none !important;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 2px solid #000;
  background: #f8f8f8;
  flex-wrap: wrap;
}

.btn-cancel {
  padding: 6px 16px !important;
  border: 2px solid #000 !important;
  background: white !important;
  color: #000 !important;
  font-size: 14px !important;
  font-weight: normal !important;
  border-radius: 0 !important;
}

.btn-cancel:hover {
  background: #f0f0f0 !important;
}

.btn-ok {
  padding: 6px 16px !important;
  border: 2px solid #000 !important;
  background: #f0f0f0 !important;
  color: #000 !important;
  font-size: 14px !important;
  font-weight: normal !important;
  border-radius: 0 !important;
}

.btn-ok:hover {
  background: #e0e0e0 !important;
}

@media (max-width: 768px) {
  .editorial-container {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
    gap: 12px;
  }

  .form-group {
    width: 100%;
  }

  .form-label {
    min-width: auto;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .form-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
