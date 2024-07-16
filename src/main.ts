import { createApp } from 'vue'
import App from './App.vue'

import "vue3-openlayers/styles.css"
import OpenLayersMap from "vue3-openlayers"

createApp(App).use(OpenLayersMap).mount('#app')
