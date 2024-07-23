<template>
  <div ref="mapContainer" class="map-container"></div>
  <div ref="zoomControl" class="zoom-control"></div>
  <div ref="mousePositionControl" class="mouse-position-control"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import ZoomSlider from 'ol/control/ZoomSlider'
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate'

const mapContainer = ref<HTMLDivElement | null>(null)
const zoomControl = ref<HTMLDivElement | null>(null)
const mousePositionControl = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (mapContainer.value && zoomControl.value && mousePositionControl.value) {
    const view = new View({
      center: [0, 0],
      zoom: 2
    })

    const map = new Map({
      target: mapContainer.value,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: view
    })

    // Initialize the ZoomSlider control and add to map
    const zoomSlider = new ZoomSlider({
      target: zoomControl.value
    })
    map.addControl(zoomSlider)

    // Initialize the MousePosition control and add to map
    const mousePosition = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      target: mousePositionControl.value
    })
    map.addControl(mousePosition)

    // Add event listener for map clicks
    map.on('singleclick', (event) => {
      const coordinates = event.coordinate
      alert(`Map clicked at: ${coordinates}`)
    })

    // Add event listener for pointer movements
    map.on('pointermove', (event) => {
      const coordinates = event.coordinate
      console.log('Pointer moved to:', coordinates)
    })
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.zoom-control {
  position: absolute;
  right: 10px;
  top: 50px;
}

.mouse-position-control {
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px;
}
</style>
