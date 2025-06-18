
<template>
  <div class="library-system">
    <div class="content-area">
      <div class="detail-form">
        <h3>Detalle de editorial</h3>
        
        <div class="id-badge" v-if="currentEditorial && !isNewMode">
          ID: {{ currentEditorial.id }}
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Nombre:</label>
            <input 
              v-model="form.nombre" 
              class="form-input" 
              placeholder="Ej. Alfaguara"
            />
          </div>
          <div class="form-group">
            <label>País:</label>
            <input 
              v-model="form.pais" 
              class="form-input" 
              placeholder="Ej. España"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Año de Fundación:</label>
            <input 
              v-model="form.añoFundacion" 
              class="form-input" 
              type="number"
              placeholder="Ej. 1964"
            />
          </div>
          <div class="form-group">
            <label>Especialidad:</label>
            <input 
              v-model="form.especialidad" 
              class="form-input" 
              placeholder="Ej. Literatura General"
            />
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-cancel" @click="cancel">Cancelar</button>
          <button class="btn-ok" @click="save">
            {{ isNewMode ? 'Crear' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  console.log('Cargando editorial ID:', id)
  const editorial = libraryStore.editoriales.find(e => e.id === id)
  console.log('Editorial encontrada:', editorial)
  if (editorial) {
    currentEditorial.value = editorial

    Object.assign(form, {
      nombre: editorial.nombre,
      pais: editorial.pais,
      añoFundacion: editorial.añoFundacion,
      especialidad: editorial.especialidad
    })
  }
}

function resetForm() {
  console.log('Reseteando formulario')
  Object.assign(form, {
    nombre: '',
    pais: '',
    añoFundacion: '',
    especialidad: ''
  })
  currentEditorial.value = null
}

function save() {
  if (isNewMode.value) {
    // Crear nueva editorial
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
.library-system {
  font-family: Arial, sans-serif;
  border: 2px solid #000;
  background: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  background: white;
  padding: 0;
  margin: 0;
}

.detail-form {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.detail-form h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
}

.id-badge {
  background: #90EE90;
  color: #000;
  padding: 6px 12px;
  border: 2px solid #000;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 0;
}

.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.form-group label {
  font-weight: bold;
  min-width: 140px;
  color: #000;
  font-size: 14px;
}

.form-input {
  padding: 8px 12px;
  border: 2px solid #000;
  font-size: 14px;
  background: white;
  flex: 1;
  border-radius: 0;
  font-family: Arial, sans-serif;
}

.form-input:focus {
  outline: none;
  border-color: #000;
  box-shadow: inset 0 0 0 1px #000;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
}

.btn-cancel, .btn-ok {
  padding: 8px 20px;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  background: white;
  border-radius: 0;
  font-family: Arial, sans-serif;
}

.btn-cancel:hover {
  background: #f0f0f0;
}

.btn-ok {
  background: #f0f0f0;
}

.btn-ok:hover {
  background: #e0e0e0;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group {
    width: 100%;
  }
  
  .form-group label {
    min-width: auto;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>