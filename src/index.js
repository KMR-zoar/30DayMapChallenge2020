import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './style.css'

import * as Red from './6.Red'

const map = new L.Map('map', {
  center: [36.06, 139.3440306],
  zoom: 10,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: Red.attribution,
  maxZoom: 18
}).addTo(map)

L.svg().addTo(map)

Red.renderPolygons(map, L)