import * as d3 from 'd3'
import { select } from 'd3'

export const attribution =
  'Polygon data <a href="https://www.e-stat.go.jp/">政府統計の総合窓口(e-Stat)</a> 国勢調査2020年埼玉県川越市 | <a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

  export const renderPolygons = (map, L) => {
    function projectPoint(x, y) {
      const point = map.latLngToLayerPoint(new L.LatLng(y, x))
      this.stream.point(point.x, point.y)
    }

    const density = (feature) => {
      const peopleDensity =  feature.properties.JINKO / feature.properties.AREA
      const opacity = d3.scaleLinear()
      .domain([0, 0.025])
      .range(["#FFFFFF", "#0000FF"])

      return opacity(peopleDensity)
    }

    const drawFeatures = (data) => {
      const svg = d3.select('#map').select('svg')
      const voronoiLayer = svg
        .append('g')
        .attr('class', 'leaflet-zoom-hide')
        .attr('id', 'voronoi')
      const transform = d3.geoTransform({ point: projectPoint })
      const path = d3.geoPath().projection(transform)

      const featureElement = voronoiLayer
        .selectAll('.voronoi')
        .data(data.features)
        .enter()
        .append('path')
        .attr('class', 'voronoi')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', d => density(d))
        .attr('fill-opacity', 0.5)

      const update = () => {
        featureElement.attr('d', path)
      }

      map.on('moveend', update)

      update()
    }

    d3.json('./data/h12ka11201.geojson').then((data) => {
      drawFeatures(data)
    })
  }
