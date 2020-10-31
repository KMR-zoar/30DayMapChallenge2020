import * as d3 from 'd3'

export const attribution =
  'Point data <a href="https://opendata.pref.saitama.lg.jp/data/dataset/hinanjo">川越市 避難所・避難場所</a> | <a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

export const readData = (callback) => {
  d3.csv('./data/cusersiz0106273desktopodfileevacuationspace2003.csv').then(
    (data) => {
      callback(data)
    }
  )
}

export const renderPoint = (map, L) => {
  const drawFeatures = (data) => {
    const svg = d3.select('#map').select('svg')
    const pointLayer = svg
      .append('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', pointLayer)

    const update = () => {
      d3.selectAll('.shelter').remove()

      const pointData = []

      data.forEach((d) => {
        const latlng = new L.LatLng(
          parseFloat(d['緯度']),
          parseFloat(d['経度'])
        )
        pointData.push({
          x: map.latLngToLayerPoint(latlng).x,
          y: map.latLngToLayerPoint(latlng).y,
          name: d['名称'],
        })
      })

      pointLayer
        .selectAll('circle')
        .data(pointData)
        .enter()
        .append('circle')
        .attr('class', 'shelter')
        .attr('r', 5)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('fill', 'blue')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
    }

    map.on('moveend', update)

    update()
  }

  d3.csv('./data/cusersiz0106273desktopodfileevacuationspace2003.csv').then(
    (data) => {
      drawFeatures(data)
    }
  )
}
