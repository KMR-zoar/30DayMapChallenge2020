import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './style.css'

const map = new L.Map("map", {
  center: [35.918, 139.483],
  zoom: 13
})

const attribution = '<a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>';

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: attribution,
    maxZoom: 18
  }
).addTo(map);

L.svg().addTo(map);