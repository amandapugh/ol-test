<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import MousePosition from 'ol/control/MousePosition'
import ScaleLine from 'ol/control/ScaleLine'
import Zoom from 'ol/control/Zoom'
import { createStringXY } from 'ol/coordinate'

const mapContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (mapContainer.value) {
    const view = new View({
      center: [0, 0],
      zoom: 2
    })

    const map = new Map({
      target: mapContainer.value,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: view,
      controls: [
        new MousePosition({
          coordinateFormat: createStringXY(4),
          projection: 'EPSG:4326',
          className: 'custom-mouse-position',
          target: document.getElementById('mouse-position')!,
        }),
        new ScaleLine(),
        new Zoom()
      ]
    })

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

    // Add zoom listener
    view.on('change:resolution', () => {
      const zoom = view.getZoom()
      console.log('Zoom level changed to:', zoom)
    })
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.custom-mouse-position {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 2px;
  background: rgba(0, 60, 136, 0.5);
  color: white;
}
</style>
