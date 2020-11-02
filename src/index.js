import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './style.css'

import * as Polygons from './3.Polygons'

const map = new L.Map('map', {
  center: [35.918, 139.483],
  zoom: 13,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: Polygons.attribution,
  maxZoom: 18
}).addTo(map)

L.svg().addTo(map)

Polygons.renderPolygons(map, L)

Polygons.renderPoints(map, L)