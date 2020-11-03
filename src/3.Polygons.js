import * as d3 from 'd3'

export const attribution =
  'Point data <a href="https://opendata.pref.saitama.lg.jp/data/dataset/hinanjo">川越市 避難所・避難場所</a> | <a href="https://openstreetmap.org/">&copy OpenStreetMap contributors</a>'

export const renderPoints = (map, L) => {
  const drawFeatures = (data) => {
    const svg = d3.select('#map').select('svg')
    const pointLayer = svg
      .append('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', 'pointLayer')

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
        .attr('r', 3)
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
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'green')
      .attr('fill-opacity', '0.2')

    const update = () => {
      featureElement.attr('d', path)
    }

    map.on('moveend', update)

    update()
  }

  d3.json('./data/voronoi.geojson').then((data) => {
    drawFeatures(data)
  })
}
