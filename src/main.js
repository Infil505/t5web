import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'


// Componentes PrimeVue que usaremos
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('p-tabview', TabView)
app.component('p-tabpanel', TabPanel)
app.component('p-accordion', Accordion)
app.component('p-accordion-tab', AccordionTab)
app.component('p-button', Button)
app.component('p-input-text', InputText)
app.component('p-dropdown', Dropdown)
app.component('p-multi-select', MultiSelect)
app.component('p-data-table', DataTable)
app.component('p-column', Column)

app.mount('#app')
