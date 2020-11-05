import * as d3 from 'd3'

export const attribution =
  'Polygon data <a href="https://nlftp.mlit.go.jp/ksj/">国土数値情報（DIDデータ）</a> | <a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

export const renderPolygons = (map, L) => {
  function projectPoint(x, y) {
    const point = map.latLngToLayerPoint(new L.LatLng(y, x))
    this.stream.point(point.x, point.y)
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
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'Red')
      .attr('fill-opacity', 0.4)

    const update = () => {
      featureElement.attr('d', path)
    }

    map.on('moveend', update)

    update()
  }

  d3.json('./data/A16-15_11_DID.geojson').then((data) => {
    drawFeatures(data)
  })
}
