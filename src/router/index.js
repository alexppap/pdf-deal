import { createRouter, createWebHistory } from 'vue-router'
import ToolGrid from '../components/ToolGrid.vue'
import PrintFax from '../views/PrintFax.vue'
import ColorConverter from '../views/ColorConverter.vue'
import JsonTools from '../views/JsonTools/index.vue'

const routes = [
  {
    path: '/',
    name: 'ToolGrid',
    component: ToolGrid,
  },
  {
    path: '/print-fax',
    name: 'PrintFax',
    component: PrintFax,
  },
  {
    path: '/color-converter',
    name: 'ColorConverter',
    component: ColorConverter,
  },
  {
    path: '/json-tools',
    name: 'JsonTools',
    component: JsonTools,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 