import * as d3 from 'd3'

export const attribution =
  'Line data and basemap by <a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

export const renderLine = (map, L) => {
  function projectPoint(x, y) {
    const point = map.latLngToLayerPoint(new L.LatLng(y, x))
    this.stream.point(point.x, point.y)
  }

  const drawLines = (data) => {
    const svg = d3.select('#map').select('svg')
    const lineLayer = svg
      .select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', 'highway')
    const transform = d3.geoTransform({ point: projectPoint })
    const path = d3.geoPath().projection(transform)

    const featureElement = lineLayer
      .selectAll('.highway')
      .data(data.features)
      .enter()
      .append('path')
      .attr('class', 'highway')
      .attr('stroke', 'blue')
      .attr('stroke-with', 2)
      .attr('fill', 'none')

    const update = () => {
      featureElement.attr('d', path)
    }

    map.on('moveend', update)

    update()
  }

  d3.json('./data/highway.geojson').then((data) => {
    drawLines(data)
  })
}
