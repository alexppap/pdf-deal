import { createRouter, createWebHistory } from 'vue-router'
import ToolGrid from '../components/ToolGrid.vue'
import PrintFax from '../views/PrintFax.vue'
import ColorConverter from '../views/ColorConverter.vue'
import JsonTools from '../views/JsonTools/index.vue'
import ImageConverter from '../views/ImageConverter.vue'
import ImageEditor from '../views/ImageEditor.vue'
import ImageCompressor from '../views/ImageCompressor.vue'
import MarkdownEditor from '../views/MarkdownEditor.vue'
import TimestampConverter from '../views/TimestampConverter.vue'
import RegexTester from '../views/RegexTester.vue'
import RandomGenerator from '../views/RandomGenerator.vue'

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
  {
    path: '/image-converter',
    name: 'ImageConverter',
    component: ImageConverter,
  },
  {
    path: '/image-editor',
    name: 'ImageEditor',
    component: ImageEditor,
  },
  {
    path: '/image-compressor',
    name: 'ImageCompressor',
    component: ImageCompressor,
  },
  {
    path: '/markdown-editor',
    name: 'MarkdownEditor',
    component: MarkdownEditor,
  },
  {
    path: '/timestamp-converter',
    name: 'TimestampConverter',
    component: TimestampConverter,
  },
  {
    path: '/regex-tester',
    name: 'RegexTester',
    component: RegexTester,
  },
  {
    path: '/random-generator',
    name: 'RandomGenerator',
    component: RandomGenerator,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 