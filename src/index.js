import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './style.css'

import * as Lines from './2.Lines'

const map = new L.Map('map', {
  center: [35.918, 139.483],
  zoom: 13,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: Lines.attribution,
  maxZoom: 18,
}).addTo(map)

L.svg().addTo(map)

Lines.renderLine(map, L)
