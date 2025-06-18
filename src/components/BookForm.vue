<!-- src/components/BookForm.vue -->
<template>
  <div class="p-fluid card">
    <h2 class="text-lg font-bold mb-4">Detalle de libro</h2>

    <div class="field">
      <label>Nombre</label>
      <InputText v-model="bookData.name" />
    </div>

    <div class="field">
      <label>ISBN</label>
      <InputText v-model="bookData.isbn" />
    </div>

    <div class="flex gap-4">
      <div class="field w-1/2">
        <label>Año</label>
        <InputText v-model="bookData.year" />
      </div>
      <div class="field w-1/2">
        <label>Edición</label>
        <Dropdown v-model="bookData.edition" :options="editionOptions" placeholder="Seleccionar" />
      </div>
    </div>

    <div class="field">
      <label>Editorial</label>
      <span class="block text-blue-600 cursor-pointer">Ediciones Alfaguara</span>
      <Button label="Cambiar editorial" class="mt-2" />
    </div>

    <div class="field">
      <label>Autores</label>
      <div class="flex gap-2">
        <MultiSelect v-model="bookData.authors" :options="authorOptions" optionLabel="name" placeholder="Seleccionar" />
        <Button label="Agregar autor" />
        <Button label="Eliminar autor" severity="danger" />
      </div>
    </div>

    <div class="flex justify-end mt-4 gap-2">
      <Button label="Cancel" severity="secondary" />
      <Button label="OK" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'

const props = defineProps({
  book: Object
})

const editionOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' }
]

const authorOptions = [
  { name: 'Mark Twain' },
  { name: 'Allan Poe' },
  { name: 'Lewis Carroll' }
]

const bookData = reactive({
  name: props.book?.name || '',
  isbn: '12244-5678-45',
  year: '2004',
  edition: '5',
  authors: [{ name: 'Mark Twain' }]
})
</script>
