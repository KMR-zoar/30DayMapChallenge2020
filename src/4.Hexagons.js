import * as d3 from 'd3'

export const attribution =
  '<a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

export const renderPoints = (map, L) => {
  const drawFeatures = (data) => {
    const svg = d3.select('#map').select('svg')
    const pointLayer = svg
      .append('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', pointLayer)

    const update = () => {
      d3.selectAll('.kame').remove()

      const pointData = []

      data.features.forEach((d) => {
        const latlng = new L.LatLng(
          d.geometry.coordinates[1],
          d.geometry.coordinates[0]
        )
        pointData.push({
          x: map.latLngToLayerPoint(latlng).x,
          y: map.latLngToLayerPoint(latlng).y,
          name: d.properties.name,
        })
      })

      pointLayer
        .selectAll('image')
        .data(pointData)
        .enter()
        .append('image')
        .attr('class', 'kame')
        .attr('height', 35)
        .attr('width', 30)
        .attr('xlink:href', './data/hexagon.svg')
        .attr('transform', (d) => {
          return 'translate(' + (d.x -15) + ',' + (d.y -18) + ')'})
    }

    map.on('moveend', update)

    update()
  }

  d3.json('./data/kame.geojson').then((data) => {
    drawFeatures(data)
  })
}
