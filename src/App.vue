<template>
  <div id="app">
    <div class="header">
      Sistema de Biblioteca
    </div>
    
    <div class="main-container">
      <div class="sidebar">
        <SidebarSection 
          title="Autores" 
          :items="store.autores"
          @new-item="handleNewAuthor"
          @delete-item="handleDeleteAuthor"
          @select-item="handleSelectAuthor"
        />
        
        <SidebarSection 
          title="Libros" 
          :items="store.libros"
          @new-item="handleNewBook"
          @delete-item="handleDeleteBook"
          @select-item="handleSelectBook"
        />
        
        <SidebarSection 
          title="Editoriales" 
          :items="store.editoriales"
          @new-item="handleNewEditorial"
          @delete-item="handleDeleteEditorial"
          @select-item="handleSelectEditorial"
        />
        
        <SidebarSection 
          title="Clasificación" 
          :items="store.clasificaciones"
          @new-item="handleNewClasificacion"
          @delete-item="handleDeleteClasificacion"
          @select-item="handleSelectClasificacion"
        />
      </div>
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { libraryStore } from './stores/library.js'
import SidebarSection from './components/SidebarSection.vue'

export default {
  name: 'App',
  components: {
    SidebarSection
  },
  data() {
    return {
      store: libraryStore
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    

    handleNewAuthor() {
      this.$router.push('/autores?action=new')
    },
    handleDeleteAuthor(author) {

    },
    handleSelectAuthor(author) {
      this.$router.push(`/autores?id=${author.id}`)
    },
    
    handleNewBook() {
      this.$router.push('/libros?action=new')
    },
    handleDeleteBook(book) {
    },
    handleSelectBook(book) {
      this.$router.push(`/libros?id=${book.id}`)
    },
    
    handleNewEditorial() {
      this.$router.push('/editoriales?action=new')
    },
    handleDeleteEditorial(editorial) {
    },
    handleSelectEditorial(editorial) {
      this.$router.push(`/editoriales?id=${editorial.id}`)
    },
    
    handleNewClasificacion() {
      this.$router.push('/clasificacion?action=new')
    },
    handleDeleteClasificacion(clasificacion) {
    },
    handleSelectClasificacion(clasificacion) {
      this.$router.push(`/clasificacion?id=${clasificacion.id}`)
    }
  }
}
</script>

<style>
@import './assets/styles.css';
</style>