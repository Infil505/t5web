// stores/library.js
import { reactive } from 'vue'

export const libraryStore = reactive({
  autores: [
    {
      id: 1,
      nombre: 'Mark Twain',
      ocupacion: 'Escritor',
      nacionalidad: 'USA',
      generos: ['Humor', 'Sátira', 'Aventuras'],
      seudonimo: 'Mark Twain'
    },
    {
      id: 2,
      nombre: 'Allan Poe',
      ocupacion: 'Escritor',
      nacionalidad: 'USA',
      generos: ['Terror', 'Misterio'],
      seudonimo: 'Edgar Allan Poe'
    },
    {
      id: 3,
      nombre: 'Lewis Carroll',
      ocupacion: 'Escritor',
      nacionalidad: 'Reino Unido',
      generos: ['Fantasía', 'Literatura Infantil'],
      seudonimo: 'Lewis Carroll'
    }
  ],

  libros: [
    {
      id: 1,
      nombre: 'Las aventuras de Tom Sawyer',
      isbn: '12244-5678-45',
      año: 2004,
      edicion: '5',
      editorialId: 1,         
      autores: [2,1]            
    },
    {
      id: 2,
      nombre: 'El príncipe y el mendigo',
      isbn: '11111-2222-33',
      año: 1995,
      edicion: '5',
      editorialId: 1,       
      autores: [1]
    },
    {
      id: 3,
      nombre: 'El cuervo y otros cuentos',
      isbn: '22222-3333-44',
      año: 2000,
      edicion: '2',
      editorialId: 2,         
      autores: [2]           
    },
    {
      id: 4,
      nombre: 'Alicia en el país de las maravillas',
      isbn: '33333-4444-55',
      año: 2010,
      edicion: '4',
      editorialId: 2,         
      autores: [3]            
    }
  ],

  editoriales: [
    {
      id: 1,
      nombre: 'Alfaguara',
      pais: 'España',
      añoFundacion: 1964,
      especialidad: 'Literatura General'
    },
    {
      id: 2,
      nombre: 'Penguin Books',
      pais: 'Reino Unido',
      añoFundacion: 1935,
      especialidad: 'Clásicos'
    }
  ],

  clasificaciones: [
    { id: 1, name: 'Literatura', codigo: 'LIT-001', descripcion: 'Obras literarias y novelas' },
    { id: 2, name: 'Ciencia', codigo: 'CIE-002', descripcion: 'Libros científicos y técnicos' },
    { id: 3, name: 'Historia', codigo: 'HIS-003', descripcion: 'Libros de historia y biografías' },
    { id: 4, name: 'Arte', codigo: 'ART-004', descripcion: 'Libros de arte y cultura' }
  ],

  generos: ['Humor', 'Sátira', 'Aventuras', 'Terror', 'Misterio', 'Fantasía', 'Literatura Infantil']
})
